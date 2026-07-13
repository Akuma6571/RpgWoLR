// ==========================================
// 🌍 O MUNDO BOT V2
// SISTEMA DEFINITIVO DE DADOS
// ==========================================


const {

    SlashCommandBuilder,

    EmbedBuilder

} = require("discord.js");






// ==========================================
// GERAR DADO
// ==========================================


function rolarDado(limite){



    return Math.floor(

        Math.random() * limite

    ) + 1;



}







// ==========================================
// ANALISAR RESULTADO
// ==========================================


function classificarResultado(resultado, limite){



    const porcentagem =

    (resultado / limite) * 100;





    if(porcentagem <= 5){



        return "péssimo";



    }





    if(porcentagem <= 25){



        return "ruim";



    }





    if(porcentagem <= 75){



        return "normal";



    }





    if(porcentagem <= 95){



        return "ótimo";



    }





    return "extraordinário";



}








// ==========================================
// COMANDO /DADO
// ==========================================


module.exports = {



    data: new SlashCommandBuilder()



    .setName("dado")



    .setDescription(

        "O Mundo lança um dado."

    )



    .addIntegerOption(option =>



        option

        .setName("numero")

        .setDescription(

            "Quantidade máxima do dado."

        )

        .setRequired(true)



    ),








    async execute(interaction){



        const limite = interaction.options.getInteger(

            "numero"

        );








        if(limite < 2 || limite > 100000000){



            return interaction.reply({



                content:

                "❌ O limite do dado deve estar entre 2 e 100.000.000.",



                ephemeral:true



            });



        }








        const resultado = rolarDado(

            limite

        );





        const categoria = classificarResultado(

            resultado,

            limite

        );
        // ==========================================
        // RESPOSTA DO DADO
        // ==========================================


        const embed = new EmbedBuilder()



        .setTitle(

            "🎲 Resultado do Destino"

        )



        .setDescription(


`
🌍 **O Mundo observa o lançamento.**


🎲 Resultado:

**${resultado}** / **${limite}**


📊 Classificação:

**${categoria}**


━━━━━━━━━━━━━━━━━━


🌌 O resultado foi registrado.

`

        )



        .setTimestamp();








        await interaction.reply({



            embeds:[

                embed

            ]



        });



    }





};