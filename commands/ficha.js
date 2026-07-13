const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


const database = require("../Database/database");




// ==========================================
// BOTÕES
// ==========================================

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






// ==========================================
// PÁGINA RESUMO
// ==========================================

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

🧗 Estamina: ${personagem.estamina} | 🔮 Mana: ${personagem.mana}

🧠 Inteligência: ${personagem.inteligencia} | 🎭 Carisma: ${personagem.carisma}

🌌 Aura: ${personagem.aura} | 🍀 Sorte: ${personagem.sorte}


              🎯 **Chance Crítica: ${personagem.chancecritica}%**


━━━━━━━━━━━━━━

`

    )

    .setFooter({

        text:
        "🌍 Toda existência possui uma história."

    })

    .setTimestamp();

}






// ==========================================
// PÁGINA APTIDÕES
// ==========================================

function paginaAptidoes(personagem){

    return new EmbedBuilder()

    .setTitle(
        "✨ Aptidões"
    )

    .setDescription(

`
☄️ Mágica: ${personagem.magica}%

🔥 Fogo: ${personagem.fogo}%

🪨 Terra: ${personagem.terra}%

🌪️ Ar: ${personagem.ar}%

🌊 Água: ${personagem.agua}%

☀️ Luz: ${personagem.luz}%

🌑 Escuridão: ${personagem.escuridao}%

🃏 Secundárias: ${personagem.secundarias}%

`

    );

}






// ==========================================
// PÁGINA HABILIDADES
// ==========================================

function paginaHabilidades(habilidades){

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
        texto || "Nenhuma habilidade aprendida."
    );

}






// ==========================================
// PÁGINA MAGIAS
// ==========================================

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
        texto || "Nenhuma magia aprendida."
    );

}// ==========================================
// COMANDO /FICHA
// ==========================================


const comandoFicha = {


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







        const mensagem = await interaction.reply({

            embeds:[

                paginaResumo(personagem)

            ],

            components:[

                criarBotoes()

            ],

            fetchReply:true

        });






        await database.executar(

`
UPDATE jogadores

SET mensagem_ficha=$1,

canal_ficha=$2

WHERE id=$3
`,

[

    mensagem.id,

    mensagem.channel.id,

    personagem.id

]

);




    }


};









// ==========================================
// PROCESSAR BOTÕES
// ==========================================


async function processarBotao(interaction){



    const mensagemId = interaction.message.id;





    const personagem = await database.buscarUm(

`
SELECT *

FROM jogadores

WHERE mensagem_ficha=$1
`,

[

mensagemId

]

);






    if(!personagem){


        return interaction.reply({

            content:

            "❌ Essa ficha não está vinculada a nenhum personagem.",

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







    let embed;





    switch(interaction.customId){



        case "ficha_resumo":


            embed = paginaResumo(personagem);


        break;





        case "ficha_aptidoes":


            embed = paginaAptidoes(personagem);


        break;





        case "ficha_habilidades":


            embed = paginaHabilidades(habilidades);


        break;





        case "ficha_magias":


            embed = paginaMagias(magias);


        break;





        default:


            return;

    }







    await interaction.update({

        embeds:[

            embed

        ],

        components:[

            criarBotoes()

        ]

    });



}








// ==========================================
// EXPORTAÇÃO
// ==========================================


module.exports = {

    data: comandoFicha.data,

    execute: comandoFicha.execute,

    processarBotao,

    criarBotoes

};

   