const database = require("../database/database");

const EventoMundo = require("./eventoMundo");






async function registrarMorte(

personagem_id,

motivo="Desconhecido"

){





await database.executar(

`

UPDATE jogadores

SET 

status='Morto',

mortes=mortes+1

WHERE id=$1

`,

[

personagem_id

]

);







await EventoMundo.morreu(

personagem_id

);







await EventoMundo.registrarEvento(

personagem_id,

"morte",

`Morreu por: ${motivo}`,

30,

{

curiosidade: 10,

interesse: 5

}

);



}









async function reviver(

personagem_id

){





await database.executar(

`

UPDATE jogadores

SET

status='Vivo'

WHERE id=$1

`,

[

personagem_id

]

);






await EventoMundo.registrarEvento(

personagem_id,

"renascimento",

"O jogador retornou após a morte.",

50,

{

interesse: 20,

curiosidade: 15

}

);



}










module.exports = {



registrarMorte,

reviver



};