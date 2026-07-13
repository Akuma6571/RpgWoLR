const {
    SlashCommandBuilder
} = require("discord.js");

const db = require("../database/database");


const DONO_ID = "806138859053121546";


module.exports = {


    data: new SlashCommandBuilder()

        .setName("editarficha")

        .setDescription(
            "Edita uma ficha de jogador"
        )


        .addUserOption(option =>

            option

                .setName("jogador")

                .setDescription(
                    "Jogador que terá a ficha alterada"
                )

                .setRequired(true)

        )


        .addStringOption(option =>

            option

                .setName("atributo")

                .setDescription(
                    "Atributo que será alterado"
                )

                .setRequired(true)

        )


        .addStringOption(option =>

            option

                .setName("valor")

                .setDescription(
                    "Novo valor do atributo"
                )

                .setRequired(true)

        ),



    async execute(interaction) {


        if (interaction.user.id !== DONO_ID) {


            await interaction.reply({

                content:
                "🌍 O mundo observa sua tentativa, mas este caminho não lhe foi concedido.",

                ephemeral: true

            });


            return;

        }



        const jogador = interaction.options.getUser("jogador");

        const atributo = interaction.options.getString("atributo");

        const valor = interaction.options.getString("valor");



        const atributosPermitidos = [


            "titulo",
            "nome",
            "idade",
            "altura",

            "raca",
            "classe",
            "subclasse",

            "vida",
            "resistencia",
            "forca",
            "agilidade",
            "estamina",
            "mana",
            "inteligencia",
            "carisma",
            "aura",
            "sorte",
            "chancecritica",

            "magica",
            "fogo",
            "terra",
            "ar",
            "agua",
            "luz",
            "escuridao",
            "secundarias",

            "habilidades",
            "magias",

            "nivel",
            "xp"

        ];



        if (!atributosPermitidos.includes(atributo)) {


            await interaction.reply({

                content:
                "🌍 Esse atributo não pertence às leis conhecidas do mundo.",

                ephemeral: true

            });


            return;

        }



        try {


            const resultado = await db.query(

                "SELECT nome FROM jogadores WHERE id = $1",

                [jogador.id]

            );



            if (resultado.rows.length === 0) {


                await interaction.reply({

                    content:
                    "🌍 Esse jogador ainda não possui uma ficha.",

                    ephemeral: true

                });


                return;

            }



            await db.query(

                `

                UPDATE jogadores

                SET ${atributo} = $1

                WHERE id = $2

                `,


                [

                    valor,

                    jogador.id

                ]

            );



            await interaction.reply({

                content:

                `🌍 As leis do mundo foram alteradas.\n\n` +

                `✨ Jogador: ${jogador.username}\n` +

                `📜 Atributo: ${atributo}\n` +

                `🔹 Novo valor: ${valor}`

            });



        } catch(error) {


            console.error(error);


            await interaction.reply({

                content:
                "🌍 Uma falha ocorreu ao tentar alterar a realidade.",

                ephemeral: true

            });


        }


    }


};