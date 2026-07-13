const Mundo = require("./mundo");
const logger = require("../utils/logger");



class Dados {



    rolar(lados = 20){


        return Math.floor(

            Math.random() * lados

        ) + 1;


    }






    rolarVarios(quantidade, lados = 20){


        let resultados = [];


        for(

            let i = 0;

            i < quantidade;

            i++

        ){

            resultados.push(

                this.rolar(lados)

            );

        }


        return resultados;


    }







    calcularResultado(valor, dificuldade){


        if(valor >= dificuldade){

            return "sucesso";

        }


        return "falha";


    }







    interpretar(resultado){



        if(resultado === 1){


            return {

                tipo:"azar_extremo",

                mensagem:

                "Uma falha crítica."


            };


        }




        if(resultado === 20){


            return {

                tipo:"sorte_extrema",

                mensagem:

                "Um sucesso extraordinário."

            };


        }





        return {

            tipo:"normal",

            mensagem:

            "Resultado comum."

        };


    }







    async rolarComMundo(personagemId, lados=20){



        const resultado = this.rolar(

            lados

        );



        const interpretacao = this.interpretar(

            resultado

        );



        let comentario = null;




        if(

            interpretacao.tipo === "sorte_extrema"

        ){


            comentario = await Mundo.comentarEvento(

                personagemId,

                "sorte"

            );


        }





        if(

            interpretacao.tipo === "azar_extremo"

        ){


            comentario = await Mundo.comentarEvento(

                personagemId,

                "azar"

            );


        }





        logger.info(

            `🎲 Resultado: ${resultado}/${lados}`

        );



        return {


            valor: resultado,


            lados,


            tipo: interpretacao.tipo,


            comentario


        };


    }






    modificarResultado(valor, modificador){


        return valor + modificador;


    }




}



module.exports = new Dados();