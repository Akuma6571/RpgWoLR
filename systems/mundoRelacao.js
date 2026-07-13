const database = require("../database/database");





async function criarRelacao(personagem_id){



const existe = await database.buscarUm(

`

SELECT *

FROM mundo_personagem

WHERE personagem_id=$1

`,

[

personagem_id

]

);





if(!existe){



await database.executar(

`

INSERT INTO mundo_personagem

(

personagem_id

)

VALUES

($1)

`,

[

personagem_id

]

);



}



}









async function alterarRelacao(

personagem_id,

campo,

valor

){



await criarRelacao(personagem_id);





const permitidos = [

"interesse",

"respeito",

"irritacao",

"curiosidade",

"diversao",

"interferencias"

];






if(!permitidos.includes(campo)){



throw new Error(

`Campo de relação inválido: ${campo}`

);



}






await database.executar(

`

UPDATE mundo_personagem

SET ${campo} = ${campo} + $1

WHERE personagem_id=$2

`,

[

valor,

personagem_id

]

);



}









async function alterarAfinidade(

personagem_id,

afinidade

){



const valoresPermitidos = [

"hostil",

"desconfiado",

"neutro",

"favoravel",

"aliado"

];






if(!valoresPermitidos.includes(afinidade)){



throw new Error(

"Valor de afinidade inválido."

);



}







await criarRelacao(personagem_id);







await database.executar(

`

UPDATE mundo_personagem

SET afinidade=$1

WHERE personagem_id=$2

`,

[

afinidade,

personagem_id

]

);



}









async function registrarMemoria(

personagem_id,

tipo,

descricao,

importancia=1

){



if(importancia < 1){

importancia = 1;

}





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

($1,$2,$3,$4)

`,

[

personagem_id,

tipo,

descricao,

importancia

]

);



}









async function adicionarInterferencia(

personagem_id

){



await alterarRelacao(

personagem_id,

"interferencias",

1

);



}









async function aumentarInteresse(

personagem_id,

valor

){



await alterarRelacao(

personagem_id,

"interesse",

valor

);



}









async function aumentarRespeito(

personagem_id,

valor

){



await alterarRelacao(

personagem_id,

"respeito",

valor

);



}









module.exports = {



criarRelacao,

alterarRelacao,

alterarAfinidade,

registrarMemoria,

adicionarInterferencia,

aumentarInteresse,

aumentarRespeito



};