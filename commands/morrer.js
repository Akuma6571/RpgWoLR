const { SlashCommandBuilder } = require("discord.js");

const database = require("../database/database");

const EventoMundo = require("../systems/eventoMundo");





module.exports = {



data: new SlashCommandBuilder()

.setName("morrer")

.setDescription(
"Registra a morte de um personagem."
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

.setName("motivo")

.setDescription(
"Motivo da morte."
)

.setRequired(true)

),





async execute(interaction){





const personagem_id = interaction.options.getString(
"personagem"
);


const motivo = interaction.options.getString(
"motivo"
);






const jogador = await database.buscarUm(

`

SELECT *

FROM jogadores

WHERE id=$1

`,

[

personagem_id

]

);






if(!jogador){


return interaction.reply({

content:

"❌ Personagem não encontrado.",

ephemeral:true

});



}








const falaMundo = await EventoMundo.morreu(

personagem_id

);








await database.executar(

`

UPDATE jogadores

SET

status='Morto',

mortes=mortes+1

WHERE id=$1

`,

[

personagem_id

]

);








await interaction.reply(

`

💀 **Morte registrada!**


Personagem:

${jogador.nome}



Motivo:

${motivo}



🌍 **O Mundo diz:**


"${falaMundo}"

`

);



}



};