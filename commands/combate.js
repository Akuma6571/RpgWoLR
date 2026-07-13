// ==========================================
// 🌍 O MUNDO BOT V2
// SISTEMA DEFINITIVO DE COMBATE
// ==========================================


const {

    SlashCommandBuilder,

    EmbedBuilder

} = require("discord.js");



const database = require("../database/database");









// ==========================================
// COMBATE ATUAL
// ==========================================


let combateAtual = {};









// ==========================================
// COMANDO COMBATE
// ==========================================


module.exports = {



data: new SlashCommandBuilder()



.setName("combate")



.setDescription(

    "Sistema de combate do Mundo."

)







.addSubcommand(sub =>



sub

.setName("iniciar")

.setDescription(

    "Inicia um combate."

)


.addStringOption(option =>


option

.setName("criatura")

.setDescription(

    "Nome da criatura enfrentada."

)

.setRequired(true)


)



.addStringOption(option =>


option

.setName("raridade")

.setDescription(

    "Raridade da criatura."

)

.setRequired(true)


)


)







.addSubcommand(sub =>



sub

.setName("finalizar")

.setDescription(

    "Finaliza um combate."

)



.addStringOption(option =>


option

.setName("resultado")

.setDescription(

    "Resultado do combate."

)

.setRequired(true)


.addChoices(

{

name:"Vitória",

value:"vitoria"

},

{

name:"Derrota",

value:"derrota"

},

{

name:"Morte",

value:"morte"

},

{

name:"Fuga",

value:"fuga"

}

)

)



.addStringOption(option =>


option

.setName("alvo")

.setDescription(

    "Alvo derrotado ou enfrentado."

)

.setRequired(true)


)





.addIntegerOption(option =>


option

.setName("xp")

.setDescription(

    "Quantidade de XP entregue."

)

.setRequired(true)


)


),








async execute(interaction){


const sub = interaction.options.getSubcommand();
    // ==========================================
    // INICIAR COMBATE
    // ==========================================


    if(sub === "iniciar"){



        const criatura = interaction.options.getString(

            "criatura"

        );



        const raridade = interaction.options.getString(

            "raridade"

        );








        combateAtual[interaction.guild.id] = {



            criatura,


            raridade,


            iniciadoPor: interaction.user.id,


            inicio: Date.now()



        };








        const embed = new EmbedBuilder()



        .setTitle(

            "⚔️ Um combate se inicia"

        )



        .setDescription(


`
🌍 **O Mundo observa.**


Uma nova batalha começa.


👹 **Criatura:**

${criatura}


✨ **Raridade:**

${raridade}


━━━━━━━━━━━━━━━━━━


O destino aguarda o desfecho.

`

        )



        .setTimestamp();








        return interaction.reply({



            embeds:[

                embed

            ]



        });



    }









    // ==========================================
    // FINALIZAR COMBATE
    // ==========================================


    if(sub === "finalizar"){



        const resultado = interaction.options.getString(

            "resultado"

        );



        const alvo = interaction.options.getString(

            "alvo"

        );



        const xp = interaction.options.getInteger(

            "xp"

        );








        const combate = combateAtual[interaction.guild.id];








        const criatura = combate ? combate.criatura : alvo;



        const raridade = combate ? combate.raridade : "desconhecida";








        const embed = new EmbedBuilder()



        .setTitle(

            "⚔️ O combate chegou ao fim"

        )



        .setDescription(


`
🌍 **O Mundo testemunhou o confronto.**


👹 **Alvo:**

${criatura}


✨ **Raridade:**

${raridade}



📜 **Resultado:**

${resultado}



⭐ **Experiência concedida:**

${xp} XP


━━━━━━━━━━━━━━━━━━


O registro desta batalha foi marcado.

`

        )



        .setTimestamp();








        delete combateAtual[interaction.guild.id];








        return interaction.reply({



            embeds:[

                embed

            ]



        });



    }



}

};
// ==========================================
// FUNÇÕES EXPORTADAS
// ==========================================


module.exports.combateAtual = combateAtual;