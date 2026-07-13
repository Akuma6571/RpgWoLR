const database = require("../database/database");
const XP = require("./xp");
const Mundo = require("./mundo");
const Dados = require("./dados");
const logger = require("../utils/logger");


class Combate {



    async iniciar(atacanteId, alvo, tipo="normal"){


        const evento = await database.buscarUm(

            `

            INSERT INTO eventos

            (

            personagem_id,

            tipo,

            descricao

            )

            VALUES($1,$2,$3)

            RETURNING *

            `,

            [

                atacanteId,

                "combate",

                `Entrou em combate contra ${alvo}`

            ]

        );



        await Mundo.registrarMemoria(

            atacanteId,

            "combate_iniciado",

            `Iniciou combate contra ${alvo}`,

            2

        );



        return evento;

    }








    async finalizarVitoria(personagemId, alvo, nivelAlvo, tipoAlvo="normal"){



        const recompensa = XP.calcularRecompensa(

            nivelAlvo,

            tipoAlvo

        );





        await XP.adicionarXP(

            personagemId,

            recompensa

        );






        await database.executar(

            `

            UPDATE estatisticas_combate

            SET

            combates = combates + 1,

            vitorias = vitorias + 1,

            mortes_causadas = mortes_causadas + 1

            WHERE personagem_id=$1

            `,

            [

                personagemId

            ]

        );






        const frase = await Mundo.comentarEvento(

            personagemId,

            "vitoria"

        );






        await database.executar(

            `

            INSERT INTO eventos

            (

            personagem_id,

            tipo,

            descricao,

            resultado,

            xp_recebido

            )

            VALUES($1,$2,$3,$4,$5)

            `,

            [

                personagemId,

                "combate_finalizado",

                `Derrotou ${alvo}`,

                "vitória",

                recompensa

            ]

        );





        return {


            xp: recompensa,


            comentario: frase


        };


    }









    async finalizarDerrota(personagemId, causa){



        await database.executar(

            `

            UPDATE estatisticas_combate

            SET

            combates = combates + 1,

            derrotas = derrotas + 1

            WHERE personagem_id=$1

            `,

            [

                personagemId

            ]

        );





        const frase = await Mundo.comentarEvento(

            personagemId,

            "derrota"

        );





        return {


            comentario: frase,


            causa


        };


    }









    async tentarFuga(personagemId, dificuldade){



        const dado = await Dados.rolarComMundo(

            personagemId,

            20

        );



        const sucesso = dado.valor >= dificuldade;






        if(!sucesso){


            await Mundo.registrarMemoria(

                personagemId,

                "fuga_falhou",

                "Tentou escapar de um combate.",

                3

            );


        }





        return {


            sucesso,


            dado: dado.valor,


            comentario: dado.comentario


        };


    }








    async registrarMorte(personagemId, causa, local){



        const personagem = await database.buscarUm(

            `

            SELECT mortes

            FROM personagens

            WHERE id=$1

            `,

            [

                personagemId

            ]

        );



        const numero = Number(personagem.mortes) + 1;





        let estado = "morto";



        if(numero === 1){


            estado = "purgatorio";


        }



        if(numero === 2){


            estado = "inferno";


        }



        if(numero >= 3){


            estado = "excluido";


            await database.executar(

                `

                INSERT INTO personagens_excluidos

                (

                nome,

                antigo_id,

                motivo

                )

                SELECT nome,id,$2

                FROM personagens

                WHERE id=$1

                `,

                [

                    personagemId,

                    "Terceira morte"

                ]

            );


        }







        await database.executar(

            `

            UPDATE personagens

            SET

            mortes=$1,

            estado=$2

            WHERE id=$3

            `,

            [

                numero,

                estado,

                personagemId

            ]

        );






        await database.executar(

            `

            INSERT INTO historico_morte

            (

            personagem_id,

            numero_morte,

            local,

            causa,

            estado_resultante

            )

            VALUES($1,$2,$3,$4,$5)

            `,

            [

                personagemId,

                numero,

                local,

                causa,

                estado

            ]

        );






        const frase = await Mundo.comentarEvento(

            personagemId,

            "morte"

        );





        logger.info(

            `Morte registrada: ${personagemId}`

        );



        return {


            estado,


            comentario: frase


        };


    }




}



module.exports = new Combate();