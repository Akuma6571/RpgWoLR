const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const database = require("../database/database");



const DONO_ID = process.env.DONO_ID;





module.exports = {



data: new SlashCommandBuilder()

.setName("mundo")

.setDescription(
"Mostra a relação do Mundo com um personagem."
)

.addStringOption(option =>

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







const id = interaction.options.getString(

"personagem"

);







const personagem = await database.buscarUm(

`

SELECT *

FROM jogadores

WHERE id=$1

`,

[

id

]

);







if(!personagem){


return interaction.reply({

content:

"❌ Personagem não encontrado.",

ephemeral:true

});


}







let relacao = await database.buscarUm(

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



await database.executar(

`

INSERT INTO mundo_personagem

(

personagem_id

)

VALUES

($1)

`,

[

id

]

);






relacao = await database.buscarUm(

`

SELECT *

FROM mundo_personagem

WHERE personagem_id=$1

`,

[

id

]

);



}








const memorias = await database.buscarTodos(

`

SELECT *

FROM memorias_mundo

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

━━━━━━━━━━━━━━



👤 **Personagem:**

${personagem.nome || "Sem nome"}



🧬 **Raça:**

${personagem.raca}



⚔ **Classe:**

${personagem.classe}



━━━━━━━━━━━━━━



👁 **Interesse:**

${relacao.interesse}



⭐ **Respeito:**

${relacao.respeito}



🔥 **Irritação:**

${relacao.irritacao}



🌀 **Curiosidade:**

${relacao.curiosidade}



🎭 **Diversão:**

${relacao.diversao}



⚡ **Interferências:**

${relacao.interferencias}



⚖ **Afinidade:**

${relacao.afinidade}



🔒 **Segredo:**

${relacao.segredo || "Nenhum registrado"}



━━━━━━━━━━━━━━



🧠 **Memórias importantes:**

`;








if(memorias.length === 0){


texto +=

"Nenhuma memória registrada.";


}else{



memorias.forEach(m=>{


texto +=

`

• **${m.tipo}**

"${m.descricao}"

Importância: ${m.importancia}

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