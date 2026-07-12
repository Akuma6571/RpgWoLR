const {
    SlashCommandBuilder
} = require("discord.js");

const db = require("../database/database");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("registrar")

        .setDescription(
            "Cria sua ficha no mundo"
        ),


    async execute(interaction) {


        const userId = interaction.user.id;

        const username = interaction.user.username;



        db.get(

            "SELECT id FROM jogadores WHERE id = ?",

            [userId],

            async (err, row) => {


                if (err) {

                    console.error(err);

                    await interaction.reply({

                        content:
                        "🌍 As leis do mundo falharam ao tentar reconhecer sua existência.",

                        ephemeral: true

                    });

                    return;

                }



                if (row) {


                    await interaction.reply({

                        content:
                        "🌍 O mundo já reconhece sua existência. Sua ficha já foi criada.",

                        ephemeral: true

                    });


                    return;

                }



                db.run(

                    `

                    INSERT INTO jogadores

                    (

                    id,
                    nome

                    )

                    VALUES

                    (?,?)

                    `,

                    [

                    userId,
                    username

                    ],


                    async (err) => {


                        if (err) {

                            console.error(err);


                            await interaction.reply({

                                content:
                                "🌍 As leis do mundo foram perturbadas. Sua ficha não pôde ser criada.",

                                ephemeral: true

                            });


                            return;

                        }



                        await interaction.reply({

                            content:
                            "🌍 O mundo reconheceu sua presença. Sua jornada começa agora.",

                            ephemeral: true

                        });


                    }

                );


            }

        );


    }

};