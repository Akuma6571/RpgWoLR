const MundoRelacao = require("./mundoRelacao");

const ReacaoMundo = require("./reacaoMundo");





async function registrarEvento(

personagem_id,

tipo,

descricao,

importancia,

alteracoes = {}

){



await MundoRelacao.criarRelacao(

personagem_id

);






for(const campo in alteracoes){



await MundoRelacao.alterarRelacao(

personagem_id,

campo,

alteracoes[campo]

);



}







await MundoRelacao.registrarMemoria(

personagem_id,

tipo,

descricao,

importancia

);







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





if(nivel === "raro") respeito = 5;


if(nivel === "lendario") respeito = 15;


if(nivel === "ancestral") respeito = 30;


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

curiosidade: 5

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

interesse: 20,

respeito: 10

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









module.exports = {



registrarEvento,

matouMonstro,

morreu,

evoluiu,

aprendeuMagia



};