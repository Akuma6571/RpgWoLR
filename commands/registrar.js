const {
    SlashCommandBuilder
} = require("discord.js");

const fs = require("fs");
const path = require("path");


const playersPath = path.join(
    __dirname,
    "../data/players.json"
);


module.exports = {

    data: new SlashCommandBuilder()

        .setName("registrar")

        .setDescription(
            "Cria sua ficha no mundo"
        ),


    async execute(interaction) {


        const userId = interaction.user.id;

        const username = interaction.user.username;


        let players = {};


        if (fs.existsSync(playersPath)) {

            players = JSON.parse(
                fs.readFileSync(playersPath)
            );

        }



        if (players[userId]) {


            await interaction.reply({

                content:
                "🌍 O mundo já reconhece sua existência. Sua ficha já foi criada.",

                ephemeral: true

            });


            return;

        }



        players[userId] = {


            titulo: "Sem título",

            nome: username,

            idade: 0,

            altura: 0,


            raca: "Não definida",

            classe: "Não definida",

            subClasse: "Não definida",



            vida: 100,

            resistencia: 10,

            forca: 10,

            agilidade: 10,

            estamina: 10,

            mana: 10,

            inteligencia: 10,

            carisma: 10,

            aura: 10,

            sorte: 10,

            chanceCritica: 5,



            aptidoes: {

                magica: 0,

                fogo: 0,

                terra: 0,

                ar: 0,

                agua: 0,

                luz: 0,

                escuridao: 0,

                secundarias: 0

            },



            habilidades: [],

            magias: [],



            nivel: 1,

            xp: 0

        };



        fs.writeFileSync(

            playersPath,

            JSON.stringify(
                players,
                null,
                4
            )

        );



        await interaction.reply({

            content:
            "🌍 O mundo reconheceu sua presença. Sua jornada começa agora.",

            ephemeral: true

        });


    }

};