const Frases = require("./frases_mundo");





async function reagirEvento(

personagem_id,

evento,

dados = {}

){





const frase = Frases.escolher(

evento

);






return frase;



}








module.exports = {


reagirEvento


};