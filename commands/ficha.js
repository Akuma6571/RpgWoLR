const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


const database = require("../Database/database");





const fichasAtivas = new Map();





function criarBotoes(){

    return new ActionRowBuilder()

    .addComponents(

        new ButtonBuilder()

        .setCustomId("ficha_resumo")

        .setLabel("📊 Resumo")

        .setStyle(ButtonStyle.Primary),



        new ButtonBuilder()

        .setCustomId("ficha_aptidoes")

        .setLabel("✨ Aptidões")

        .setStyle(ButtonStyle.Primary),



        new ButtonBuilder()

        .setCustomId("ficha_habilidades")

        .setLabel("⚔️ Habilidades")

        .setStyle(ButtonStyle.Success),



        new ButtonBuilder()

        .setCustomId("ficha_magias")

        .setLabel("📖 Magias")

        .setStyle(ButtonStyle.Danger)

    );

}





function paginaResumo(personagem){


    return new EmbedBuilder()

    .setTitle(

        `🌍 ${personagem.titulo}`

    )


    .setDescription(

`

━━━━━━━━━━━━━━


👤 **Nome:** ${personagem.nome}

🎂 **Idade:** ${personagem.idade}

📏 **Altura:** ${personagem.altura} cm


🧬 **Raça:** ${personagem.raca}

⚔️ **Classe:** ${personagem.classe}

✨ **Subclasse:** ${personagem.subclasse}


━━━━━━━━━━━━━━


📈 **Nível:** ${personagem.nivel}

⭐ **XP:** ${personagem.xp}


━━━━━━━━━━━━━━


❤️ Vida: ${personagem.vida} | 🛡️ Resistência: ${personagem.resistencia}

💪 Força: ${personagem.forca} | 🏃 Agilidade: ${personagem.agilidade}

🔥 Estamina: ${personagem.estamina} | 🔮 Mana: ${personagem.mana}

🧠 Inteligência: ${personagem.inteligencia} | 🎭 Carisma: ${personagem.carisma}

🌌 Aura: ${personagem.aura} | 🍀 Sorte: ${personagem.sorte}


🎯 **Chance Crítica: ${personagem.chancecritica}%**

`

    )


    .setFooter({

        text:

        "🌍 Toda existência possui uma história."

    })

    .setTimestamp();


}





function paginaAptidoes(personagem){


    return new EmbedBuilder()

    .setTitle(

        "✨ Aptidões"

    )


    .setDescription(

`

🔮 Mágica: ${personagem.magica}%

🔥 Fogo: ${personagem.fogo}%

🌎 Terra: ${personagem.terra}%

🌪️ Ar: ${personagem.ar}%

💧 Água: ${personagem.agua}%

☀️ Luz: ${personagem.luz}%

🌑 Escuridão: ${personagem.escuridao}%

✨ Secundárias: ${personagem.secundarias}%

`

    );

}function paginaHabilidades(habilidades){


    let texto = "";



    if(habilidades.length === 0){


        texto =

        "Nenhuma habilidade aprendida.";


    }else{


        habilidades.forEach(habilidade => {


            texto +=

            `⚔️ **${habilidade.nome}**\n`;



            if(habilidade.descricao){


                texto +=

                `${habilidade.descricao}\n`;

            }



            texto +=

            `⭐ XP: ${habilidade.xp} | Nível: ${habilidade.nivel}\n\n`;


        });


    }




    return new EmbedBuilder()

    .setTitle(

        "⚔️ Habilidades"

    )

    .setDescription(

        texto

    );


}





function paginaMagias(magias){



    let texto = "";



    if(magias.length === 0){


        texto =

        "Nenhuma magia aprendida.";


    }else{


        magias.forEach(magia => {



            texto +=


            `📖 **${magia.nome}**\n`;



            if(magia.descricao){


                texto +=

                `${magia.descricao}\n`;

            }



            texto +=


            `⭐ XP: ${magia.xp} | Nível: ${magia.nivel}\n\n`;



        });


    }




    return new EmbedBuilder()

    .setTitle(

        "📖 Magias"

    )


    .setDescription(

        texto

    );


}







module.exports = {


    data: new SlashCommandBuilder()

    .setName("ficha")

    .setDescription(
        "Mostra a ficha do personagem."
    )


    .addIntegerOption(option =>


        option

        .setName("slot")

        .setDescription(
            "Número do personagem."
        )

        .setRequired(true)


    ),





    async execute(interaction){



        const slot = interaction.options.getInteger(
            "slot"
        );



        const usuario = interaction.user.id;





        const personagem = await database.buscarUm(

`
SELECT *

FROM jogadores

WHERE usuario_id=$1

AND slot=$2
`,

[

usuario,

slot

]

);






        if(!personagem){


            return interaction.reply({

                content:

                "❌ Personagem não encontrado.",

                ephemeral:true

            });


        }






        const habilidades = await database.buscarTodos(

`
SELECT *

FROM habilidades

WHERE personagem_id=$1
`,

[

personagem.id

]

);







        const magias = await database.buscarTodos(

`
SELECT *

FROM magias

WHERE personagem_id=$1
`,

[

personagem.id

]

);





        fichasAtivas.set(

            interaction.user.id,

            {

                personagem,

                habilidades,

                magias

            }

        );





        await interaction.reply({

            embeds:[

                paginaResumo(personagem)

            ],


            components:[

                criarBotoes()

            ]

        });



    },


    paginas:{


        resumo: paginaResumo,

        aptidoes: paginaAptidoes,

        habilidades: paginaHabilidades,

        magias: paginaMagias


    },


    fichasAtivas


};