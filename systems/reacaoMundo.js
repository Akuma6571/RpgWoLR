const Frases = require("./frases_mundo");

const MundoRelacao = require("./mundoRelacao");






async function reagirEvento(

personagem_id,

evento,

dados = {}

){



let categoria = evento;






const frase = Frases.escolher(

categoria

);







if(dados.memoria){



await MundoRelacao.registrarMemoria(

personagem_id,

evento,

dados.memoria,

dados.importancia || 10

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