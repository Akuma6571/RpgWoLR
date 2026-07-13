const { SlashCommandBuilder } = require("discord.js");

const Aprendizado = require("../systems/aprendizado");





const DONO_ID = process.env.DONO_ID;






module.exports = {



data: new SlashCommandBuilder()

.setName("aprenderhabilidade")

.setDescription(
"Ensina uma habilidade para um personagem."
)

.addStringOption(option =>

option

.setName("personagem")

.setDescription(
"ID do personagem."
)

.setRequired(true)

)

.addStringOption(option =>

option

.setName("nome")

.setDescription(
"Nome da habilidade."
)

.setRequired(true)

)

.addStringOption(option =>

option

.setName("descricao")

.setDescription(
"Descrição da habilidade."
)

.setRequired(false)

),






async execute(interaction){



if(interaction.user.id !== DONO_ID){


return interaction.reply({

content:

"❌ Apenas o mestre pode ensinar habilidades.",

ephemeral:true

});



}







const personagem = interaction.options.getString(
"personagem"
);


const nome = interaction.options.getString(
"nome"
);


const descricao = interaction.options.getString(
"descricao"
) || "Sem descrição";







await Aprendizado.aprenderHabilidade(

personagem,

nome,

descricao

);







await interaction.reply(

`

⚔️ **Habilidade aprendida!**


Personagem:
${personagem}


Habilidade:
${nome}


Descrição:
${descricao}

`

);



}



};