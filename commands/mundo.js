const { SlashCommandBuilder } = require("discord.js");

const Mundo = require("../systems/mundo");

const database = require("../database/database");



const DONO_ID = process.env.DONO_ID;




module.exports = {


data: new SlashCommandBuilder()

.setName("mundo")

.setDescription(
"Mostra a relação do Mundo com um jogador."
)

.addIntegerOption(option =>

option

.setName("personagem")

.setDescription(
"ID do personagem."
)

.setRequired(true)

),






async execute(interaction){



if(interaction.user.id !== DONO_ID){


return interaction.reply({

content:

"❌ Apenas o mestre pode usar esse comando.",

ephemeral:true

});


}






const id = interaction.options.getInteger(

"personagem"

);






const relacao = await database.buscarUm(

`

SELECT *

FROM mundo_personagem

WHERE personagem_id=$1

`,

[

id

]

);






if(!relacao){


return interaction.reply({

content:

"❌ Esse personagem não possui relação com o Mundo.",

ephemeral:true

});


}







const memorias = await database.buscarTodos(

`

SELECT *

FROM memoria_mundo

WHERE personagem_id=$1

ORDER BY importancia DESC

LIMIT 10

`,

[

id

]

);







let texto = `

🌍 **Relação do Mundo**

━━━━━━━━━━━━


👁 Interesse:

${relacao.interesse}


⚡ Interferências:

${relacao.interferencias}


⚖ Afinidade:

${relacao.afinidade}


🔒 Segredo:

${relacao.segredo || "Nenhum registrado"}


━━━━━━━━━━━━


🧠 Memórias importantes:

`;







if(memorias.length === 0){


texto += "Nenhuma memória.";


}else{


memorias.forEach(m=>{


texto +=

`

• ${m.evento}

${m.comentario}

`;



});


}






await interaction.reply({

content:texto,

ephemeral:true

});



}


};