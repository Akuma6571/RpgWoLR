const database = require("../database/database");
const Atributos = require("./atributos");
const Mundo = require("./mundo");
const logger = require("../utils/logger");


class Personagem {



    async criar(discordId, dados){


        const usuario = await database.buscarUm(

            `

            SELECT *

            FROM usuarios

            WHERE discord_id=$1

            `,

            [

                discordId

            ]

        );



        if(!usuario){


            await database.executar(

                `

                INSERT INTO usuarios

                (discord_id)

                VALUES($1)

                `,

                [

                    discordId

                ]

            );


        }






        const personagens = await database.buscarTodos(

            `

            SELECT *

            FROM personagens

            WHERE discord_id=$1

            `,

            [

                discordId

            ]

        );





        if(personagens.length >= 3){


            throw new Error(

                "Limite de 3 personagens atingido."

            );


        }






        const slot = personagens.length + 1;






        const novo = await database.buscarUm(

            `

            INSERT INTO personagens

            (

            discord_id,

            slot,

            titulo,

            nome,

            idade,

            altura,

            raca,

            classe,

            subclasse

            )

            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)

            RETURNING *

            `,

            [

                discordId,

                slot,

                dados.titulo || "Sem título",

                dados.nome || "Sem nome",

                dados.idade || 0,

                dados.altura || 0,

                dados.raca || "Não definida",

                dados.classe || "Não definida",

                dados.subclasse || "Nenhuma"

            ]

        );







        await Atributos.criarAtributos(

            novo.id

        );







        await database.executar(

            `

            INSERT INTO aptidoes

            (

            personagem_id

            )

            VALUES($1)

            `,

            [

                novo.id

            ]

        );







        await database.executar(

            `

            INSERT INTO moedas

            (

            personagem_id

            )

            VALUES($1)

            `,

            [

                novo.id

            ]

        );







        await Mundo.criarPerfil(

            novo.id

        );








        await database.executar(

            `

            INSERT INTO estatisticas_combate

            (

            personagem_id

            )

            VALUES($1)

            `,

            [

                novo.id

            ]

        );








        await Mundo.registrarMemoria(

            novo.id,

            "nascimento",

            "Uma nova existência surgiu no mundo.",

            5

        );





        logger.info(

            "Novo personagem criado: "

            + novo.nome

        );



        return novo;


    }







    async buscar(discordId, slot){


        return await database.buscarUm(

            `

            SELECT *

            FROM personagens

            WHERE discord_id=$1

            AND slot=$2

            `,

            [

                discordId,

                slot

            ]

        );


    }







    async listar(discordId){


        return await database.buscarTodos(

            `

            SELECT *

            FROM personagens

            WHERE discord_id=$1

            ORDER BY slot

            `,

            [

                discordId

            ]

        );


    }







    async alterarEstado(id, estado){


        await database.executar(

            `

            UPDATE personagens

            SET estado=$1

            WHERE id=$2

            `,

            [

                estado,

                id

            ]

        );


    }



}



module.exports = new Personagem();