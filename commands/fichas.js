const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");
const path = require("path");


// Local do arquivo de jogadores

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

            .setDescription(
                "🌍 Registro oficial do mundo."
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
                    name: "🎂 Idade",
                    value: `${player.idade}`,
                    inline: true
                },

                {
                    name: "📏 Altura",
                    value: `${player.altura}`,
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
                    name: "✨ Habilidades",
                    value:
                    player.habilidades.length > 0
                    ? player.habilidades.join(", ")
                    : "Nenhuma",
                    inline: false
                },

                {
                    name: "📖 Magias",
                    value:
                    player.magias.length > 0
                    ? player.magias.join(", ")
                    : "Nenhuma",
                    inline: false
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