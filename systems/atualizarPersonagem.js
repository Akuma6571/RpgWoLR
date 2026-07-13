const FichaDiscord = require("./fichaDiscord");





async function atualizar(

client,

personagem_id

){



try{



await FichaDiscord.atualizarFicha(

client,

personagem_id

);



}

catch(erro){



console.log(

"Erro ao atualizar ficha:",

erro.message

);



}



}







module.exports = {


atualizar


};