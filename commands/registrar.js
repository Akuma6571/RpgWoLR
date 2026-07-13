const {
    SlashCommandBuilder
} = require("discord.js");

const db = require("../Database/database");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("registrar")

        .setDescription(
            "Cria sua ficha no mundo"
        ),


    async execute(interaction) {


        const userId = interaction.user.id;

        const username = interaction.user.username;



        try {


            const existente = await db.query(

                "SELECT id FROM jogadores WHERE id = $1",

                [userId]

            );



            if (existente.rows.length > 0) {


                await interaction.reply({

                    content:
                    "🌍 O mundo já reconhece sua existência. Sua ficha já foi criada.",

                    ephemeral: true

                });


                return;

            }



            await db.query(

                `

                INSERT INTO jogadores

                (

                    id,

                    nome

                )

                VALUES

                (

                    $1,

                    $2

                )

                `,


                [

                    userId,

                    username

                ]

            );



            await interaction.reply({

                content:
                "🌍 O mundo reconheceu sua presença. Sua jornada começa agora.",

                ephemeral: true

            });



        } catch (error) {


            console.error(error);


            await interaction.reply({

                content:
                "🌍 As leis do mundo foram perturbadas. Sua ficha não pôde ser criada.",

                ephemeral: true

            });


        }


    }

};