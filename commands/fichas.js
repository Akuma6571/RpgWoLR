const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");
const path = require("path");


const playersPath = path.join(
    __dirname,
    "../data/players.json"
);


module.exports = {

    data: new SlashCommandBuilder()

        .setName("ficha")

        .setDescription(
            "Mostra sua ficha de personagem"
        ),


    async execute(interaction) {


        const userId = interaction.user.id;


        let players = {};


        if (fs.existsSync(playersPath)) {

            players = JSON.parse(
                fs.readFileSync(playersPath)
            );

        }


        const player = players[userId];


        if (!player) {

            await interaction.reply({

                content:
                "🌍 O mundo ainda não reconhece sua existência. Use /registrar antes de consultar sua ficha.",

                ephemeral: true

            });

            return;

        }



        const ficha = new EmbedBuilder()

            .setTitle(
                `📜 Ficha de ${player.nome}`
            )

            .setColor("#8B0000")

            .setDescription(
                "Registro oficial do mundo."
            )



            .addFields(

                {
                    name: "🏷️ Título",
                    value: player.titulo,
                    inline: true
                },

                {
                    name: "👤 Nome",
                    value: player.nome,
                    inline: true
                },

                {
                    name: "🧬 Raça",
                    value: player.raca,
                    inline: true
                },

                {
                    name: "⚔️ Classe",
                    value: player.classe,
                    inline: true
                },

                {
                    name: "🔮 SubClasse",
                    value: player.subClasse,
                    inline: true
                },



                {
                    name: "❤️ Vida",
                    value: `${player.vida}`,
                    inline: true
                },

                {
                    name: "🛡️ Resistência",
                    value: `${player.resistencia}`,
                    inline: true
                },


                {
                    name: "💪 Força",
                    value: `${player.forca}`,
                    inline: true
                },

                {
                    name: "⚡ Agilidade",
                    value: `${player.agilidade}`,
                    inline: true
                },


                {
                    name: "🧗 Estamina",
                    value: `${player.estamina}`,
                    inline: true
                },

                {
                    name: "🩵 Mana",
                    value: `${player.mana}`,
                    inline: true
                },


                {
                    name: "🧠 Inteligência",
                    value: `${player.inteligencia}`,
                    inline: true
                },

                {
                    name: "🗣️ Carisma",
                    value: `${player.carisma}`,
                    inline: true
                },


                {
                    name: "🌌 Aura",
                    value: `${player.aura}`,
                    inline: true
                },

                {
                    name: "🍀 Sorte",
                    value: `${player.sorte}`,
                    inline: true
                },


                {
                    name: "🎯 Chance Crítica",
                    value: `${player.chanceCritica}%`,
                    inline: true
                },



                {
                    name: "Aptidões",
                    value:
                    `☄️Mágica: ${player.aptidoes.magica}%\n` +
                    `🔥Fogo: ${player.aptidoes.fogo}%\n` +
                    `🪨Terra: ${player.aptidoes.terra}%\n` +
                    `🌪️Ar: ${player.aptidoes.ar}%\n` +
                    `🌊Água: ${player.aptidoes.agua}%\n` +
                    `✨Luz: ${player.aptidoes.luz}%\n` +
                    `⚫Escuridão: ${player.aptidoes.escuridao}%\n` +
                    `🃏Secundárias: ${player.aptidoes.secundarias}%`
                },



                {
                    name: "⚔️ Habilidades",
                    value:
                    player.habilidades.length > 0
                    ? player.habilidades.join(", ")
                    : "Nenhuma"
                },

                {
                    name: "📖 Magias",
                    value:
                    player.magias.length > 0
                    ? player.magias.join(", ")
                    : "Nenhuma"
                },



                {
                    name: "⭐ Nível",
                    value: `${player.nivel}`,
                    inline: true
                },

                {
                    name: "✨ XP",
                    value: `${player.xp}`,
                    inline: true
                }

            );



        await interaction.reply({

            embeds: [ficha]

        });


    }

};