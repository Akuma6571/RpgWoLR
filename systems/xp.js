const database = require("../database/database");
const Mundo = require("./mundo");
const logger = require("../utils/logger");



class XP {



    calcularXPProximoNivel(nivel){


        return Math.floor(

            25 * Math.pow(2, nivel - 1)

        );


    }







    async adicionarXP(personagemId, quantidade){


        const personagem = await database.buscarUm(

            `

            SELECT *

            FROM personagens

            WHERE id=$1

            `,

            [

                personagemId

            ]

        );



        if(!personagem){

            throw new Error(

                "Personagem não encontrado."

            );

        }





        let xpAtual = Number(personagem.xp) + quantidade;


        let nivel = personagem.nivel;


        let xpNecessario = Number(personagem.xp_proximo);





        let subiu = false;




        while(xpAtual >= xpNecessario){


            xpAtual -= xpNecessario;


            nivel++;


            subiu = true;



            xpNecessario = this.calcularXPProximoNivel(

                nivel

            );



            await this.adicionarPontosNivel(

                personagemId

            );


        }





        await database.executar(

            `

            UPDATE personagens

            SET

            xp=$1,

            nivel=$2,

            xp_proximo=$3,

            atualizado_em=NOW()

            WHERE id=$4

            `,

            [

                xpAtual,

                nivel,

                xpNecessario,

                personagemId

            ]

        );






        await database.executar(

            `

            INSERT INTO eventos

            (

            personagem_id,

            tipo,

            descricao,

            xp_recebido

            )

            VALUES($1,$2,$3,$4)

            `,

            [

                personagemId,

                "experiencia",

                `Recebeu ${quantidade} XP`,

                quantidade

            ]

        );







        if(subiu){


            await Mundo.comentarEvento(

                personagemId,

                "vitoria"

            );


        }



        logger.info(

            `XP atualizado: ${personagemId}`

        );



        return {


            xp: xpAtual,


            nivel,


            subiu


        };


    }








    async adicionarPontosNivel(personagemId){


        await database.executar(

            `

            UPDATE atributos

            SET pontos_disponiveis = pontos_disponiveis + 5

            WHERE personagem_id=$1

            `,

            [

                personagemId

            ]

        );


    }







    async adicionarXPMagia(personagemId, magiaId, xp){



        await database.executar(

            `

            UPDATE magias

            SET xp = xp + $1

            WHERE id=$2

            AND personagem_id=$3

            `,

            [

                xp,

                magiaId,

                personagemId

            ]

        );


    }







    async adicionarXPHabilidade(personagemId, habilidadeId, xp){



        await database.executar(

            `

            UPDATE habilidades

            SET xp = xp + $1

            WHERE id=$2

            AND personagem_id=$3

            `,

            [

                xp,

                habilidadeId,

                personagemId

            ]

        );


    }







    calcularRecompensa(alvoNivel, alvoTipo="normal"){



        let multiplicador = 1;



        if(alvoTipo === "chefe"){

            multiplicador = 10;

        }


        if(alvoTipo === "entidade"){

            multiplicador = 100;

        }



        return Math.floor(

            alvoNivel * 50 * multiplicador

        );


    }




}



module.exports = new XP();