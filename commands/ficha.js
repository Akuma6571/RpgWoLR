const { SlashCommandBuilder } = require("discord.js");

const Ficha = require("../systems/ficha");
const Personagem = require("../systems/personagem");



module.exports = {



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



        const discordId = interaction.user.id;




        const personagem = await Personagem.buscar(

            discordId,

            slot

        );





        if(!personagem){



            return interaction.reply({

                content:

                "❌ Personagem não encontrado.",

                ephemeral:true

            });


        }






        const dados = await Ficha.buscarCompleta(

            personagem.id

        );





        const texto = Ficha.formatar(

            dados

        );





        const mensagem = await interaction.reply({

            content:texto,

            fetchReply:true

        });






        await Ficha.salvarMensagem(

            personagem.id,

            mensagem.id,

            mensagem.channel.id

        );



    }


};