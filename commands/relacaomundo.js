const { EmbedBuilder } = require("discord.js");

const Mundo = require("../systems/mundo");


module.exports = {


name: "relacaomundo",


description: "Mostra a relação do Mundo com um jogador (apenas mestre).",



async execute(message, args){



// COLOQUE SEU ID DO DISCORD AQUI

const MESTRE_ID = "SEU_ID_AQUI";



if(message.author.id !== MESTRE_ID){

return message.reply(
"🌍 O Mundo não permite que você veja essa informação."
);

}





const jogador = message.mentions.users.first();



if(!jogador){

return message.reply(
"Use: !relacaomundo @jogador"
);

}





const relacao = await Mundo.buscarRelacao(
jogador.id
);





if(!relacao){

return message.reply(
"Esse jogador ainda não possui uma relação registrada com o Mundo."
);

}





const comentario = Mundo.falar(
"especiais",
"curioso"
);






const embed = new EmbedBuilder()

.setTitle("🌍 Relação do Mundo")

.setDescription(

`**Jogador:** ${jogador.username}



**Respeito:** ${relacao.respeito}

**Interesse:** ${relacao.interesse}

**Irritação:** ${relacao.irritacao}

**Interferências:** ${relacao.interferencias}



**Memórias registradas:**

${relacao.memorias || "Nenhuma memória importante registrada."}



🌍 **Comentário do Mundo:**

"${comentario}"`

)



.setTimestamp();







message.reply({

embeds:[embed]

});



}



};