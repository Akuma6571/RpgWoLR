const MundoRelacao = require("./mundoRelacao");

const ReacaoMundo = require("./reacaoMundo");





async function registrarEvento(

    personagem_id,

    tipo,

    descricao,

    importancia,

    alteracoes = {}

){



    // Garante que existe uma relação com o Mundo

    await MundoRelacao.criarRelacao(

        personagem_id

    );







    // Altera a relação do Mundo

    for(const campo in alteracoes){



        await MundoRelacao.alterarRelacao(

            personagem_id,

            campo,

            alteracoes[campo]

        );


    }







    // Salva a memória do acontecimento

    await MundoRelacao.registrarMemoria(

        personagem_id,

        tipo,

        descricao,

        importancia

    );







    // Faz o Mundo responder

    const fala = await ReacaoMundo.reagirEvento(

        personagem_id,

        tipo,

        {

            memoria: descricao,

            importancia: importancia,

            relacao: alteracoes

        }

    );







    return fala;



}









async function matouMonstro(

    personagem_id,

    monstro,

    nivel

){



    let respeito = 2;

    let categoria = "vitoria";







    if(nivel === "raro")

        respeito = 5;





    if(nivel === "lendario")

        respeito = 15;





    if(nivel === "ancestral")

        respeito = 30;





    if(nivel === "dragao"){


        respeito = 50;

        categoria = "dragao";


    }







    return await registrarEvento(

        personagem_id,

        categoria,

        `Derrotou a criatura: ${monstro}`,

        respeito,

        {

            respeito: respeito,

            interesse: Math.floor(respeito / 2)

        }

    );


}









async function morreu(

    personagem_id

){



    return await registrarEvento(

        personagem_id,

        "morte",

        "O Mundo observou sua morte.",

        20,

        {

            curiosidade: 5,

            interesse: 5

        }

    );


}









async function evoluiu(

    personagem_id,

    formaNova

){



    return await registrarEvento(

        personagem_id,

        "evolucao",

        `Evoluiu para ${formaNova}.`,

        50,

        {

            respeito: 10,

            interesse: 20

        }

    );


}









async function aprendeuMagia(

    personagem_id,

    magia

){



    return await registrarEvento(

        personagem_id,

        "magia",

        `Aprendeu a magia ${magia}.`,

        10,

        {

            curiosidade: 5

        }

    );


}









async function magiaProibida(

    personagem_id,

    magia

){



    return await registrarEvento(

        personagem_id,

        "magia_proibida",

        `Aprendeu uma magia proibida: ${magia}.`,

        50,

        {

            curiosidade: 20,

            irritacao: 10,

            interesse: 15

        }

    );


}









async function descobriuAlgo(

    personagem_id,

    descoberta

){



    return await registrarEvento(

        personagem_id,

        "descoberta",

        `Descobriu: ${descoberta}.`,

        20,

        {

            curiosidade: 15,

            interesse: 10

        }

    );


}









async function nascimento(

    personagem_id

){



    return await registrarEvento(

        personagem_id,

        "nascimento",

        "Uma nova existência surgiu no mundo.",

        10,

        {

            curiosidade: 5

        }

    );


}









async function intervencao(

    personagem_id,

    motivo

){



    return await registrarEvento(

        personagem_id,

        "intervencao",

        `O Mundo interferiu: ${motivo}.`,

        100,

        {

            interferencias: 1,

            interesse: 30

        }

    );


}









module.exports = {


    registrarEvento,


    matouMonstro,


    morreu,


    evoluiu,


    aprendeuMagia,


    magiaProibida,


    descobriuAlgo,


    nascimento,


    intervencao


};