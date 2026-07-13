const database = require("../database/database");
const logger = require("../utils/logger");



class Mundo {


    constructor(){


        this.nome = "O Mundo";


        this.emocao = {

            curiosidade: 50,

            tédio: 80,

            irritacao: 0,

            carinho: 0

        };


    }




    async buscarPerfil(personagemId){


        return await database.buscarUm(

            `

            SELECT *

            FROM mundo_personagem

            WHERE personagem_id=$1

            `,

            [

                personagemId

            ]

        );


    }





    async criarPerfil(personagemId){


        const existente = await this.buscarPerfil(

            personagemId

        );


        if(existente){

            return existente;

        }



        await database.executar(

            `

            INSERT INTO mundo_personagem

            (personagem_id)

            VALUES($1)

            `,

            [

                personagemId

            ]

        );



        return await this.buscarPerfil(

            personagemId

        );


    }






    escolherFrase(tipo, dados={}){


        const frases = {


            nascimento:[

                "Interessante... mais uma vida começou.",

                "Vamos ver quanto tempo essa história dura.",

                "Outra alma decidiu entrar no meu mundo."

            ],



            vitoria:[

                "Parece que você sobreviveu. Que decepcionante... eu esperava mais drama.",

                "Não foi ruim. Não foi impressionante também.",

                "Você venceu. Tente não ficar convencido."

            ],



            derrota:[

                "Finalmente algo interessante aconteceu.",

                "A confiança era maior que a capacidade, aparentemente.",

                "Uma derrota também é uma história."

            ],



            sorte:[

                "Você teve sorte demais. Estou começando a desconfiar.",

                "Tudo bem... dessa vez eu deixarei passar.",

                "Interessante. O destino parece gostar de você."

            ],



            azar:[

                "Impressionante. Até o azar parece estar se esforçando.",

                "Você conseguiu falhar de uma maneira criativa.",

                "Eu quase senti pena. Quase."

            ],



            morte:[

                "A vida terminou. Mas sua história ainda pode continuar.",

                "A morte chegou para buscar o que era dela.",

                "Vamos descobrir o que existe depois daqui."

            ],



            purgatorio:[

                "Bem-vindo ao vazio.",

                "Aqui não existe glória. Apenas silêncio.",

                "Um lugar onde até a esperança parece cansada."

            ],



            inferno:[

                "Você conseguiu ir ainda mais longe do que deveria.",

                "Os habitantes daqui estavam esperando uma visita.",

                "Boa sorte. Você vai precisar."

            ],



            subjugacao:[

                "Você não ganhou um aliado. Ganhou um problema controlado.",

                "Interessante escolha. Espero que consiga manter o controle.",

                "Uma criatura poderosa agora segue você. Que divertido."

            ],



            doma:[

                "Uma fera escolheu caminhar ao seu lado.",

                "Nem toda força precisa ser conquistada pela violência.",

                "Até criaturas selvagens reconhecem algumas almas."

            ]

        };



        const lista = frases[tipo] || frases.vitoria;



        return lista[

            Math.floor(Math.random()*lista.length)

        ];

    }







    async registrarMemoria(personagemId, evento, comentario, importancia=1){



        await database.executar(

            `

            INSERT INTO memoria_mundo

            (

                personagem_id,

                evento,

                comentario,

                importancia

            )

            VALUES($1,$2,$3,$4)

            `,

            [

                personagemId,

                evento,

                comentario,

                importancia

            ]

        );


    }







    async aumentarInteresse(personagemId, valor){



        await this.criarPerfil(

            personagemId

        );



        await database.executar(

            `

            UPDATE mundo_personagem

            SET interesse = interesse + $1

            WHERE personagem_id=$2

            `,

            [

                valor,

                personagemId

            ]

        );


    }







    async comentarEvento(personagemId,tipo){



        const frase = this.escolherFrase(

            tipo

        );



        await this.registrarMemoria(

            personagemId,

            tipo,

            frase,

            2

        );


        logger.info(

            "🌍 Mundo: "

            + frase

        );


        return frase;


    }



}



module.exports = new Mundo();