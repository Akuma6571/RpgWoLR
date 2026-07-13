const database = require("../database/database");

const EventoMundo = require("./eventoMundo");






function calcularXPnecessario(nivel){


return nivel * nivel * 100;



}









async function adicionarXP(

personagem_id,

quantidade

){





const jogador = await database.buscarUm(

`

SELECT *

FROM jogadores

WHERE id=$1

`,

[

personagem_id

]

);







if(!jogador){

throw new Error(

"Personagem não encontrado."

);

}







let novoXP = Number(jogador.xp) + quantidade;

let novoNivel = Number(jogador.nivel);

let subiu = false;








while(

novoXP >= calcularXPnecessario(novoNivel)

){



novoXP -= calcularXPnecessario(novoNivel);


novoNivel++;


subiu = true;



}








await database.executar(

`

UPDATE jogadores

SET

xp=$1,

nivel=$2

WHERE id=$3

`,

[

novoXP,

novoNivel,

personagem_id

]

);









if(subiu){



await database.executar(

`

UPDATE jogadores

SET

pontos_atributo=pontos_atributo+5

WHERE id=$1

`,

[

personagem_id

]

);






await EventoMundo.registrarEvento(

personagem_id,

"nivel",

`Alcançou o nível ${novoNivel}.`,

40,

{

interesse: 15,

respeito: 10,

curiosidade: 5

}

);



}






return {


xp: novoXP,

nivel: novoNivel,

subiu: subiu


};



}








module.exports = {



adicionarXP,

calcularXPnecessario



};