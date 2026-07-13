const Frases = require("./frases");

const MundoRelacao = require("./mundoRelacao");





async function reagirEvento(

personagem_id,

evento,

dados={}

){



let categoria = evento;


let tipo = "normal";





if(evento === "morte"){

categoria = "morte";

tipo = "jogador";

}



if(evento === "vitoria"){

categoria = "combate";

tipo = "vitoria";

}



if(evento === "dragao"){

categoria = "combate";

tipo = "lendario";

}



if(evento === "magia_proibida"){

categoria = "magia";

tipo = "proibida";

}





const frase = Frases.escolher(

categoria,

tipo

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