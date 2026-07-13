const { SlashCommandBuilder } = require("discord.js");

const database = require("../database/database");

const Ficha = require("../systems/ficha");





const DONO_ID = process.env.DONO_ID;






module.exports = {



data: new SlashCommandBuilder()

.setName("editar-ficha")

.setDescription(
    "Edita qualquer parte da ficha de um jogador."
)

.addStringOption(option =>

    option

    .setName("campo")

    .setDescription(
        "Campo que será alterado."
    )

    .setRequired(true)

)


.addStringOption(option =>

    option

    .setName("valor")

    .setDescription(
        "Novo valor."
    )

    .setRequired(true)

)


.addIntegerOption(option =>

    option

    .setName("personagem")

    .setDescription(
        "ID interno do personagem."
    )

    .setRequired(true)

),







async execute(interaction){



if(

interaction.user.id !== DONO_ID

){


return interaction.reply({

content:

"❌ Apenas o mestre pode usar esse comando.",

ephemeral:true

});


}






const personagem =

interaction.options.getInteger(

"personagem"

);



const campo =

interaction.options.getString(

"campo"

);



const valor =

interaction.options.getString(

"valor"

);








const permitidos = [



"nome",

"titulo",

"idade",

"altura",

"raca",

"classe",

"subclasse",

"nivel",

"xp",



];







if(!permitidos.includes(campo)){



return interaction.reply({

content:

"❌ Campo não permitido.",

ephemeral:true

});


}







await database.executar(

`

UPDATE personagens

SET ${campo}=$1

WHERE id=$2

`,

[

valor,

personagem

]

);







const ficha = await Ficha.buscarMensagem(

personagem

);





if(ficha){


try{


const mensagem =

await interaction.client.channels

.fetch(ficha.canal_id)

.then(c =>

c.messages.fetch(

ficha.mensagem_id

)

);



const dados = await Ficha.buscarCompleta(

personagem

);



await mensagem.edit(

Ficha.formatar(dados)

);



}catch(error){


console.log(

"Não foi possível editar mensagem antiga."

);


}



}







await interaction.reply({

content:

"✅ Ficha atualizada.",

ephemeral:true

});



}



};