const frases = require("./frases_mundo");

const database = require("../database/database");






function escolher(lista){


return lista[

Math.floor(

Math.random() * lista.length

)

];


}








async function comentarEvento(

personagemId,

evento

){



let categoria = "vitoria";





if(evento === "derrota"){

categoria = "derrota";

}


if(evento === "morte"){

categoria = "morte";

}


if(evento === "sorte"){

categoria = "sorte";

}


if(evento === "azar"){

categoria = "azar";

}


if(evento === "chefe"){

categoria = "chefe_derrotado";

}


if(evento === "entidade"){

categoria = "entidade_derrotada";

}







return escolher(

frases[categoria]

);



}









async function registrarMemoria(

personagemId,

tipo,

descricao,

importancia = 1

){



try{



await database.executar(

`

INSERT INTO memorias_mundo

(

personagem_id,

tipo,

descricao,

importancia

)

VALUES($1,$2,$3,$4)

`,

[

personagemId,

tipo,

descricao,

importancia

]

);



}catch(error){


console.log(

"Erro ao salvar memória do Mundo:",

error.message

);


}



}









async function criarRelacao(

personagemId

){



try{



await database.executar(

`

INSERT INTO mundo_personagem

(

personagem_id,

interesse,

interferencias,

afinidade

)

VALUES($1,$2,$3,$4)

ON CONFLICT DO NOTHING

`,

[

personagemId,

0,

0,

"neutro"

]

);



}catch(error){



console.log(

"Erro ao criar relação:",

error.message

);



}



}









async function aumentarInteresse(

personagemId,

valor

){



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








module.exports = {



comentarEvento,


registrarMemoria,


criarRelacao,


aumentarInteresse



};