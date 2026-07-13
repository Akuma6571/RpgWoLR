const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const db = require("../database/database");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("ficha")

        .setDescription(
            "Mostra sua ficha de personagem"
        ),


    async execute(interaction) {


        const userId = interaction.user.id;



        try {


            const resultado = await db.query(

                "SELECT * FROM jogadores WHERE id = $1",

                [userId]

            );



            if (resultado.rows.length === 0) {


                await interaction.reply({

                    content:
                    "🌍 O mundo ainda não reconhece sua existência. Use /registrar antes de consultar sua ficha.",

                    ephemeral: true

                });


                return;

            }



            const player = resultado.rows[0];



            const ficha = new EmbedBuilder()


                .setTitle(
                    `📜 Ficha de ${player.nome}`
                )


                .setColor("#8B0000")


                .addFields(


                    {

                        name: "🏷️ Informações",

                        value:

                        `🏷️ Título: ${player.titulo}\n` +
                        `👤 Nome: ${player.nome}\n` +
                        `🧬 Raça: ${player.raca}\n` +
                        `⚔️ Classe: ${player.classe}\n` +
                        `🔮 SubClasse: ${player.subclasse}`

                    },


                    {

                        name: "⚔️ Estatísticas",

                        value:

                        `❤️ Vida: ${player.vida}          🛡️ Resistência: ${player.resistencia}\n` +
                        `💪 Força: ${player.forca}           ⚡ Agilidade: ${player.agilidade}\n` +
                        `🧗 Estamina: ${player.estamina}       🩵 Mana: ${player.mana}\n` +
                        `🧠 Inteligência: ${player.inteligencia}   🗣️ Carisma: ${player.carisma}\n` +
                        `🌌 Aura: ${player.aura}            🍀 Sorte: ${player.sorte}\n` +
                        `🎯 Chance Crítica: ${player.chancecritica}%`

                    },


                    {

                        name: "✨ Aptidões",

                        value:

                        `☄️Mágica: ${player.magica}%\n` +
                        `🔥Fogo: ${player.fogo}%\n` +
                        `🪨Terra: ${player.terra}%\n` +
                        `🌪️Ar: ${player.ar}%\n` +
                        `🌊Água: ${player.agua}%\n` +
                        `✨Luz: ${player.luz}%\n` +
                        `⚫Escuridão: ${player.escuridao}%\n` +
                        `🃏Secundárias: ${player.secundarias}%`

                    },


                    {

                        name: "⚔️ Habilidades",

                        value:

                        player.habilidades || "Nenhuma"

                    },


                    {

                        name: "📖 Magias",

                        value:

                        player.magias || "Nenhuma"

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



        } catch(error) {


            console.error(error);


            await interaction.reply({

                content:
                "🌍 As leis do mundo falharam ao consultar sua ficha.",

                ephemeral: true

            });


        }


    }

};