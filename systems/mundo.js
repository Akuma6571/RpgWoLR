const frases = require("./frases_mundo");

const database = require("../database/database");





function escolher(lista){


    if(!lista || lista.length === 0){

        return "O Mundo observa em silêncio.";

    }


    return lista[

        Math.floor(Math.random() * lista.length)

    ];

}







async function comentarEvento(

personagemId,

evento,

dados = {}

){



    let categoria = "vitoria";



    if(evento === "derrota")
        categoria = "derrota";


    if(evento === "morte")
        categoria = "morte";


    if(evento === "sorte")
        categoria = "sorte";


    if(evento === "azar")
        categoria = "azar";


    if(evento === "chefe")
        categoria = "chefe_derrotado";


    if(evento === "entidade")
        categoria = "entidade_derrotada";






    let relacao = await buscarRelacao(

        personagemId

    );






    let chanceEspecial = Math.random();




    // Jogadores que chamam muita atenção recebem respostas diferentes


    if(relacao){


        if(relacao.respeito > 70 && chanceEspecial < 0.3){

            return "Interessante... finalmente algo digno da minha atenção.";

        }



        if(relacao.irritacao > 70 && chanceEspecial < 0.3){

            return "Você realmente está se esforçando para testar minha paciência.";

        }



        if(relacao.diversao > 70 && chanceEspecial < 0.3){

            return "Confesso que você é uma das poucas coisas que ainda conseguem me entreter.";

        }


    }







    return escolher(

        frases[categoria]

    );

}





async function criarRelacao(

personagemId

){



    await database.executar(

    `

    INSERT INTO mundo_personagem

    (

    personagem_id,

    interesse,

    respeito,

    irritacao,

    curiosidade,

    diversao,

    interferencias,

    afinidade

    )


    VALUES

    (

    $1,

    0,

    0,

    0,

    0,

    0,

    0,

    'neutro'

    )


    ON CONFLICT DO NOTHING


    `,


    [

    personagemId

    ]

    );


}









async function buscarRelacao(

personagemId

){



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









async function alterarRelacao(

personagemId,

campo,

valor

){



    const camposPermitidos = [


        "interesse",

        "respeito",

        "irritacao",

        "curiosidade",

        "diversao",

        "interferencias"


    ];





    if(!camposPermitidos.includes(campo)){

        return;

    }







    await database.executar(

    `

    UPDATE mundo_personagem

    SET ${campo} = ${campo} + $1

    WHERE personagem_id=$2


    `,


    [

    valor,

    personagemId

    ]

    );


}









async function registrarMemoria(

personagemId,

tipo,

descricao,

importancia = 1

){



    await database.executar(

    `

    INSERT INTO memorias_mundo

    (

    personagem_id,

    tipo,

    descricao,

    importancia

    )


    VALUES

    (

    $1,

    $2,

    $3,

    $4

    )


    `,


    [

    personagemId,

    tipo,

    descricao,

    importancia

    ]

    );


}









async function obterMemorias(

personagemId

){



    return await database.buscarTodos(

    `

    SELECT *

    FROM memorias_mundo

    WHERE personagem_id=$1

    ORDER BY importancia DESC


    `,


    [

    personagemId

    ]

    );


}









async function tentarInterferir(

personagemId,

tipo

){



    let relacao = await buscarRelacao(

        personagemId

    );





    if(!relacao){

        return false;

    }






    let chance = 0;





    if(tipo === "ajuda"){

        chance = relacao.interesse / 200;

    }





    if(tipo === "punicao"){

        chance = relacao.irritacao / 200;

    }






    return Math.random() < chance;



}









async function mentir(){




const respostas = [


"Talvez."

,

"Eu poderia responder... mas qual seria a graça?",

"Essa informação não pertence a você.",

"Tenho uma resposta, mas prefiro observar sua descoberta.",

"Quem disse que eu sou obrigado a dizer a verdade?"



];





return escolher(respostas);



}









module.exports = {


comentarEvento,


criarRelacao,


buscarRelacao,


alterarRelacao,


registrarMemoria,


obterMemorias,


tentarInterferir,


mentir


};