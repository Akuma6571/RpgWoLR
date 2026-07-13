const database = require("../database/database");
const Mundo = require("./mundo");
const Dados = require("./dados");
const logger = require("../utils/logger");


class Domador {



    async domar(personagemId, criatura){


        const dado = await Dados.rolarComMundo(

            personagemId,

            20

        );



        let sucesso = dado.valor >= 10;




        if(!sucesso){


            const frase = await Mundo.comentarEvento(

                personagemId,

                "derrota"

            );


            return {


                sucesso:false,


                comentario: frase


            };


        }







        await database.executar(

            `

            INSERT INTO criaturas_domadas

            (

            personagem_id,

            nome,

            especie,

            nivel,

            descricao

            )

            VALUES($1,$2,$3,$4,$5)

            `,

            [

                personagemId,

                criatura.nome,

                criatura.especie,

                criatura.nivel || 1,

                criatura.descricao || ""

            ]

        );






        const frase = await Mundo.comentarEvento(

            personagemId,

            "doma"

        );






        await Mundo.registrarMemoria(

            personagemId,

            "criatura_domada",

            `Domou ${criatura.nome}`,

            4

        );





        logger.info(

            "Criatura domada: "

            + criatura.nome

        );



        return {


            sucesso:true,


            comentario:frase


        };


    }








    async subjugar(personagemId, criatura){



        const dado = await Dados.rolarComMundo(

            personagemId,

            20

        );



        const dificuldade =

            criatura.nivel || 10;



        let sucesso =

            dado.valor >= dificuldade;







        if(!sucesso){


            return {


                sucesso:false,


                comentario:

                "A criatura recusou sua autoridade."

            };


        }







        await database.executar(

            `

            INSERT INTO criaturas_subjugadas

            (

            personagem_id,

            nome,

            especie,

            nivel,

            poder,

            descricao

            )

            VALUES($1,$2,$3,$4,$5,$6)

            `,

            [

                personagemId,

                criatura.nome,

                criatura.especie,

                criatura.nivel || 1,

                criatura.poder || "Desconhecido",

                criatura.descricao || ""

            ]

        );







        await Mundo.registrarMemoria(

            personagemId,

            "criatura_subjugada",

            `Subjugou ${criatura.nome}`,

            6

        );






        const frase = await Mundo.comentarEvento(

            personagemId,

            "subjugacao"

        );






        return {


            sucesso:true,


            comentario:frase


        };



    }








    async listarDomadas(personagemId){



        return await database.buscarTodos(

            `

            SELECT *

            FROM criaturas_domadas

            WHERE personagem_id=$1

            `,

            [

                personagemId

            ]

        );


    }







    async listarSubjugadas(personagemId){


        return await database.buscarTodos(

            `

            SELECT *

            FROM criaturas_subjugadas

            WHERE personagem_id=$1

            `,

            [

                personagemId

            ]

        );


    }



}



module.exports = new Domador();