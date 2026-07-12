const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const db = require("../Database/database");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("ficha")

        .setDescription(
            "Mostra sua ficha de personagem"
        ),


    async execute(interaction) {


        const userId = interaction.user.id;



        db.get(

            "SELECT * FROM jogadores WHERE id = ?",


            [userId],


            async (err, player) => {



                if (err) {

                    console.error(err);


                    await interaction.reply({

                        content:
                        "🌍 As leis do mundo falharam ao consultar sua existência.",

                        ephemeral: true

                    });


                    return;

                }



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

                            player.habilidades !== "[]"
                            ? player.habilidades
                            : "Nenhuma"

                        },



                        {

                            name: "📖 Magias",

                            value:

                            player.magias !== "[]"
                            ? player.magias
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

        );



    }

};