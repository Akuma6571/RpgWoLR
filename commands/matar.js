const { SlashCommandBuilder } = require("discord.js");

const database = require("../database/database");

const Experiencia = require("../systems/experiencia");

const EventoMundo = require("../systems/eventoMundo");





module.exports = {



data: new SlashCommandBuilder()

.setName("matar")

.setDescription(
"Registra a derrota de um monstro."
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

.setName("monstro")

.setDescription(
"Nome do monstro derrotado."
)

.setRequired(true)

)

.addStringOption(option =>

option

.setName("nivel")

.setDescription(
"Nível da criatura."
)

.setRequired(true)

.addChoices(

{
name:"Comum",
value:"comum"
},

{
name:"Raro",
value:"raro"
},

{
name:"Lendário",
value:"lendario"
},

{
name:"Ancestral",
value:"ancestral"
},

{
name:"Dragão",
value:"dragao"
}

)

),





async execute(interaction){





const personagem_id = interaction.options.getString(
"personagem"
);


const monstro = interaction.options.getString(
"monstro"
);


const nivel = interaction.options.getString(
"nivel"
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







const recompensa = {


comum:50,


raro:200,


lendario:1000,


ancestral:5000,


dragao:20000


};







const xp = recompensa[nivel];







const resultado = await Experiencia.adicionarXP(

personagem_id,

xp

);








const falaMundo = await EventoMundo.matouMonstro(

personagem_id,

monstro,

nivel

);







await interaction.reply(

`

⚔️ **Vitória registrada!**


Monstro:

${monstro}



XP recebido:

${xp}



Nível atual:

${resultado.nivel}



${resultado.subiu ? "🌟 Você evoluiu!" : ""}



🌍 **O Mundo diz:**


"${falaMundo}"

`

);



}



};