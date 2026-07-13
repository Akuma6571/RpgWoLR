const Frases = require("./frases_mundo");

const MundoRelacao = require("./mundoRelacao");





async function reagirEvento(

    personagem_id,

    evento,

    dados = {}

){



    const frase = Frases.escolher(

        evento

    );





    if(dados.memoria){



        await MundoRelacao.registrarMemoria(

            personagem_id,

            evento,

            dados.memoria,

            dados.importancia || 1

        );


    }







    if(dados.relacao){



        for(const campo in dados.relacao){



            await MundoRelacao.alterarRelacao(

                personagem_id,

                campo,

                dados.relacao[campo]

            );


        }


    }







    return frase;



}








module.exports = {


    reagirEvento


};