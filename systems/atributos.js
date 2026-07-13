const database = require("../database/database");
const logger = require("../utils/logger");


class Atributos {


    async buscar(personagemId){


        return await database.buscarUm(

            `

            SELECT *

            FROM atributos

            WHERE personagem_id=$1

            `,

            [

                personagemId

            ]

        );


    }






    async adicionarPontos(personagemId, atributo, quantidade){


        const permitidos = [

            "vida",

            "forca",

            "agilidade",

            "estamina",

            "mana",

            "inteligencia",

            "carisma",

            "aura",

            "sorte",

            "chance_critica"

        ];



        if(!permitidos.includes(atributo)){


            throw new Error(

                "Atributo inválido."

            );


        }




        const dados = await this.buscar(

            personagemId

        );



        if(!dados){


            throw new Error(

                "Atributos não encontrados."

            );


        }




        if(dados.pontos_disponiveis < quantidade){


            throw new Error(

                "Pontos insuficientes."

            );


        }





        const limite = await this.buscarLimite(

            atributo

        );



        const atual = Number(

            dados[atributo]

        );



        if(atual + quantidade > limite){


            throw new Error(

                "Limite máximo atingido."

            );


        }






        await database.executar(

            `

            UPDATE atributos

            SET

            ${atributo} = ${atributo} + $1,

            pontos_disponiveis = pontos_disponiveis - $1

            WHERE personagem_id=$2

            `,

            [

                quantidade,

                personagemId

            ]

        );





        await this.calcularResistencia(

            personagemId

        );




        logger.info(

            `Atributo aumentado: ${atributo}`

        );



        return true;


    }








    async buscarLimite(atributo){



        const resultado = await database.buscarUm(

            `

            SELECT limite

            FROM limites_atributos

            WHERE atributo=$1

            `,

            [

                atributo

            ]

        );



        return Number(

            resultado.limite

        );


    }








    async calcularResistencia(personagemId){



        const atributos = await this.buscar(

            personagemId

        );



        const resistencia = Math.floor(

            (

                Number(atributos.vida)

                +

                Number(atributos.forca)

            )

            /

            10

        );





        await database.executar(

            `

            UPDATE atributos

            SET resistencia=$1

            WHERE personagem_id=$2

            `,

            [

                resistencia,

                personagemId

            ]

        );



        return resistencia;


    }







    async criarAtributos(personagemId){



        await database.executar(

            `

            INSERT INTO atributos

            (

            personagem_id

            )

            VALUES($1)

            `,

            [

                personagemId

            ]

        );



    }







    verificarEquilibrio(dados){



        let avisos = [];



        if(

            dados.forca >

            dados.resistencia * 10

        ){


            avisos.push(

                "O corpo possui dificuldade em suportar essa força."

            );


        }





        if(

            dados.mana >

            dados.inteligencia * 100

        ){


            avisos.push(

                "A quantidade de mana ultrapassa a capacidade de controle."

            );


        }





        if(

            dados.agilidade >

            dados.estamina * 10

        ){


            avisos.push(

                "A velocidade exige mais energia do que o corpo suporta."

            );


        }




        return avisos;


    }



}


module.exports = new Atributos();