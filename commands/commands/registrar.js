const {
    SlashCommandBuilder
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



        // Verifica se já existe

        if (players[userId]) {


            await interaction.reply({

                content:
                "🌍 O mundo já reconhece sua existência. Sua ficha já foi criada.",

                ephemeral: true

            });


            return;

        }



        // Criação da ficha inicial

        players[userId] = {

            titulo: "Sem título",

            nome: username,

            idade: 0,

            altura: 0,

            raca: "Não definida",

            classe: "Não definida",

            subClasse: "Não definida",


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
            "🌍 O mundo reconheceu sua presença. Sua ficha foi criada e sua jornada começa agora.",

            ephemeral: true

        });


    }

};