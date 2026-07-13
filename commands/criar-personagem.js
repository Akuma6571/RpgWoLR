const { SlashCommandBuilder } = require("discord.js");

const Personagem = require("../systems/personagem");

const Mundo = require("../systems/mundo");




module.exports = {



data: new SlashCommandBuilder()


.setName("criar-personagem")


.setDescription(
    "Cria um novo personagem."
)



.addStringOption(option =>


option

.setName("nome")

.setDescription(
    "Nome do personagem."
)

.setRequired(true)


)



.addStringOption(option =>


option

.setName("raca")

.setDescription(
    "Raça do personagem."
)

.setRequired(true)


)



.addStringOption(option =>


option

.setName("classe")

.setDescription(
    "Classe do personagem."
)

.setRequired(true)


)



.addStringOption(option =>


option

.setName("subclasse")

.setDescription(
    "Subclasse inicial."
)

.setRequired(false)


)



.addIntegerOption(option =>


option

.setName("idade")

.setDescription(
    "Idade."
)

.setRequired(false)


)



.addIntegerOption(option =>


option

.setName("altura")

.setDescription(
    "Altura em centímetros."
)

.setRequired(false)


),






async execute(interaction){



await interaction.deferReply();




const dados = {



nome:

interaction.options.getString(
"nome"
),



raca:

interaction.options.getString(
"raca"
),



classe:

interaction.options.getString(
"classe"
),



subclasse:

interaction.options.getString(
"subclasse"
)
||
"Nenhuma",



idade:

interaction.options.getInteger(
"idade"
)
||
0,



altura:

interaction.options.getInteger(
"altura"
)
||
0



};







try{



const personagem = await Personagem.criar(

interaction.user.id,

dados

);






const comentario = await Mundo.comentarEvento(

personagem.id,

"nascimento"

);







await interaction.editReply(

`

🌍 **Uma nova existência surgiu.**

👤 Nome:
${personagem.nome}

🧬 Raça:
${personagem.raca}

⚔️ Classe:
${personagem.classe}

✨ Subclasse:
${personagem.subclasse}


${comentario}

`

);





}catch(error){



await interaction.editReply(

"❌ Erro ao criar personagem: "

+ error.message

);


}



}



};