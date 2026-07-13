const vitoria = require("./vitoria");
const morte = require("./morte");
const dados = require("./dados");
const fuga = require("./fuga");
const evolucao = require("./evolucao");
const magia = require("./magia");
const habilidade = require("./habilidade");
const monstros = require("./monstros");
const chefes = require("./chefes");
const especiais = require("./especiais");



const bancoFrases = {



vitoria,

morte,

dados,

fuga,

evolucao,

magia,

habilidade,

monstros,

chefes,

especiais



};







function escolher(categoria, tipo){



try{



const grupo = bancoFrases[categoria];



if(!grupo){

return "O Mundo permanece em silêncio.";

}







const frases = grupo[tipo];







if(!frases || frases.length === 0){

return "O Mundo observa sem dizer nada.";

}







const aleatorio = Math.floor(

Math.random() * frases.length

);







return frases[aleatorio];





}catch(erro){



console.error(

"Erro ao buscar frase do Mundo:",

erro

);



return "O Mundo permaneceu em silêncio.";

}



}








function listaCategorias(){



return Object.keys(bancoFrases);



}








function existeCategoria(categoria,tipo){



if(!bancoFrases[categoria]){

return false;

}



if(!bancoFrases[categoria][tipo]){

return false;

}



return true;



}








module.exports = {



escolher,

listaCategorias,

existeCategoria



};