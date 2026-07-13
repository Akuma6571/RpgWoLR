const { SlashCommandBuilder } = require("discord.js");

const Dados = require("../systems/dados");

const Personagem = require("../systems/personagem");



module.exports = {



data: new SlashCommandBuilder()

.setName("rolar")

.setDescription(
    "Rola um dado."
)


.addIntegerOption(option =>

option

.setName("lados")

.setDescription(
    "Quantidade de lados do dado."
)

.setRequired(false)

)

.addIntegerOption(option =>

option

.setName("slot")

.setDescription(
    "Seu personagem."
)

.setRequired(true)

),






async execute(interaction){



const slot = interaction.options.getInteger(

"slot"

);



const lados = interaction.options.getInteger(

"lados"

)

|| 20;






const personagem = await Personagem.buscar(

interaction.user.id,

slot

);






if(!personagem){



return interaction.reply({

content:

"❌ Personagem não encontrado.",

ephemeral:true

});


}







const resultado = await Dados.rolarComMundo(

personagem.id,

lados

);






let resposta = `

🎲 **Resultado do dado**

D${lados}

Resultado:

**${resultado.valor}**

`;





if(resultado.tipo === "sorte_extrema"){


resposta +=

`

🍀 Sucesso crítico.

${resultado.comentario}

`;



}





if(resultado.tipo === "azar_extremo"){



resposta +=

`

💀 Falha crítica.

${resultado.comentario}

`;



}






await interaction.reply(

resposta

);



}



};