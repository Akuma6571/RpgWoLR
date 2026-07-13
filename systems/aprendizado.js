const database = require("../database/database");

const EventoMundo = require("./eventoMundo");







async function aprenderMagia(

personagem_id,

nome,

descricao="Sem descrição"

){





await database.executar(

`

INSERT INTO magias

(

personagem_id,

nome,

descricao

)

VALUES

($1,$2,$3)

`,

[

personagem_id,

nome,

descricao

]

);







await EventoMundo.registrarEvento(

personagem_id,

"magia",

`Aprendeu a magia ${nome}.`,

20,

{

curiosidade:10,

interesse:5

}

);



}









async function aprenderHabilidade(

personagem_id,

nome,

descricao="Sem descrição"

){





await database.executar(

`

INSERT INTO habilidades

(

personagem_id,

nome,

descricao

)

VALUES

($1,$2,$3)

`,

[

personagem_id,

nome,

descricao

]

);







await EventoMundo.registrarEvento(

personagem_id,

"habilidade",

`Aprendeu a habilidade ${nome}.`,

20,

{

curiosidade:5,

respeito:5

}

);



}








async function evoluirMagia(

idMagia

){





await database.executar(

`

UPDATE magias

SET

nivel=nivel+1,

xp=0

WHERE id=$1

`,

[

idMagia

]

);



}








async function evoluirHabilidade(

idHabilidade

){





await database.executar(

`

UPDATE habilidades

SET

nivel=nivel+1,

xp=0

WHERE id=$1

`,

[

idHabilidade

]

);



}









module.exports = {



aprenderMagia,

aprenderHabilidade,

evoluirMagia,

evoluirHabilidade



};