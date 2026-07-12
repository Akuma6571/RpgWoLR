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
                    name: "🏷️ Identidade",
                    value:
                    `🏷️ Título: ${player.titulo}\n` +
                    `👤 Nome: ${player.nome}\n` +
                    `🧬 Raça: ${player.raca}\n` +
                    `⚔️ Classe: ${player.classe}\n` +
                    `🔮 SubClasse: ${player.subClasse}`
                },


                {
                    name: "⚔️ Estatísticas",
                    value:
                    `❤️ Vida: ${player.vida}          🛡️ Resistência: ${player.resistencia}\n` +
                    `💪 Força: ${player.forca}           ⚡ Agilidade: ${player.agilidade}\n` +
                    `🧗 Estamina: ${player.estamina}       🩵 Mana: ${player.mana}\n` +
                    `🧠 Inteligência: ${player.inteligencia}   🗣️ Carisma: ${player.carisma}\n` +
                    `🌌 Aura: ${player.aura}            🍀 Sorte: ${player.sorte}\n` +
                    `🎯 Chance Crítica: ${player.chanceCritica}%`
                },


                {
                    name: "✨ Aptidões",
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
                    name: "⭐ Progressão",
                    value:
                    `⭐ Nível: ${player.nivel}\n` +
                    `✨ XP: ${player.xp}`
                }

            );



        await interaction.reply({

            embeds: [ficha]

        });


    }

};