const { SlashCommandBuilder } = require("discord.js");

const Frases = require("../systems/frases");


const DONO_ID = process.env.DONO_ID;



module.exports = {


data: new SlashCommandBuilder()

.setName("falarmundo")

.setDescription(
"Força o Mundo a enviar uma mensagem."
)

.addStringOption(option =>

option

.setName("mensagem")

.setDescription(
"O que o Mundo deve dizer."
)

.setRequired(true)

),





async execute(interaction){



if(interaction.user.id !== DONO_ID){


return interaction.reply({

content:

"❌ Apenas o mestre pode controlar a voz do Mundo.",

ephemeral:true

});


}






const mensagem = interaction.options.getString(
"mensagem"
);







await interaction.reply({

content:

`🌍 **O Mundo diz:**\n\n"${mensagem}"`

});



}



};