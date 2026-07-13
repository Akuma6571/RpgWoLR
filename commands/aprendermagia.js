const { SlashCommandBuilder } = require("discord.js");

const Aprendizado = require("../systems/aprendizado");





const DONO_ID = process.env.DONO_ID;






module.exports = {



data: new SlashCommandBuilder()

.setName("aprendermagia")

.setDescription(
"Ensina uma magia para um personagem."
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
"Nome da magia."
)

.setRequired(true)

)

.addStringOption(option =>

option

.setName("descricao")

.setDescription(
"Descrição da magia."
)

.setRequired(false)

),






async execute(interaction){



if(interaction.user.id !== DONO_ID){


return interaction.reply({

content:

"❌ Apenas o mestre pode ensinar magias.",

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







await Aprendizado.aprenderMagia(

personagem,

nome,

descricao

);







await interaction.reply(

`

🔮 **Magia aprendida!**


Personagem:
${personagem}


Magia:
${nome}


Descrição:
${descricao}

`

);



}



};