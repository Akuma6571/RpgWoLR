const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const database = require("../database/database");



const DONO_ID = process.env.DONO_ID;




module.exports = {



data: new SlashCommandBuilder()

.setName("mundo")

.setDescription(
"Mostra a relação do Mundo com um personagem."
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

"❌ Apenas o mestre pode acessar a visão do Mundo.",

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

"❌ Esse personagem ainda não possui uma relação registrada com o Mundo.",

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







const personagem = await database.buscarUm(

`

SELECT *

FROM personagens

WHERE id=$1

`,

[

id

]

);







let texto = `

🌍 **Relação do Mundo**

━━━━━━━━━━━━━━


👤 Personagem:

${personagem ? personagem.nome : "Desconhecido"}


👁 Interesse:

${relacao.interesse}


⚡ Interferências:

${relacao.interferencias}


⚖ Afinidade:

${relacao.afinidade}


🔒 Segredo:

${relacao.segredo || "Nenhum registrado"}


━━━━━━━━━━━━━━


🧠 Memórias importantes:

`;







if(memorias.length === 0){


texto += "Nenhuma memória registrada.";


}else{


memorias.forEach(m=>{


texto +=

`

• ${m.evento}

"${m.comentario}"

`;



});


}







const embed = new EmbedBuilder()

.setTitle("🌍 Visão do Mundo")

.setDescription(texto)

.setTimestamp();







await interaction.reply({

embeds:[embed],

ephemeral:true

});



}


};