const {
    SlashCommandBuilder
} = require("discord.js");

const db = require("../Database/database");


const DONO_ID = "806138859053121546";


module.exports = {

    data: new SlashCommandBuilder()

        .setName("editarficha")

        .setDescription("Edita qualquer parte de uma ficha")


        .addUserOption(option =>
            option
            .setName("jogador")
            .setDescription("Jogador que terá a ficha alterada")
            .setRequired(true)
        )


        .addStringOption(option =>
            option
            .setName("atributo")
            .setDescription("Campo que será alterado")
            .setRequired(true)
        )


        .addStringOption(option =>
            option
            .setName("valor")
            .setDescription("Novo valor")
            .setRequired(true)
        ),



    async execute(interaction) {


        if (interaction.user.id !== DONO_ID) {

            return interaction.reply({

                content:
                "🌍 O mundo observa sua tentativa, mas este caminho não lhe foi concedido.",

                ephemeral: true

            });

        }



        const jogador =
        interaction.options.getUser("jogador");


        const atributo =
        interaction.options.getString("atributo")
        .toLowerCase();



        const valor =
        interaction.options.getString("valor");



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

            "nivel",
            "xp"

        ];



        if (!atributosPermitidos.includes(atributo)) {


            return interaction.reply({

                content:
                "🌍 Este atributo não existe nas leis do mundo.",

                ephemeral:true

            });

        }



        try {


            const jogadorExiste = await db.query(

                "SELECT id FROM jogadores WHERE id = $1",

                [
                    jogador.id
                ]

            );



            if (jogadorExiste.rows.length === 0) {


                return interaction.reply({

                    content:
                    "🌍 Este jogador ainda não possui uma ficha.",

                    ephemeral:true

                });

            }



            let valorFinal = valor;



            const camposNumericos = [

                "idade",
                "altura",

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

                "nivel",
                "xp"

            ];



            if (camposNumericos.includes(atributo)) {

                valorFinal = Number(valor);


                if (isNaN(valorFinal)) {


                    return interaction.reply({

                        content:
                        "🌍 Esse atributo precisa receber um número.",

                        ephemeral:true

                    });

                }

            }



            await db.query(

                `

                UPDATE jogadores

                SET ${atributo} = $1

                WHERE id = $2

                `,

                [

                    valorFinal,

                    jogador.id

                ]

            );



            await interaction.reply({

                content:

                `🌍 As leis do mundo foram alteradas.\n\n✨ ${atributo} de ${jogador.username} agora é ${valorFinal}.`

            });



        } catch(error) {


            console.error(error);


            await interaction.reply({

                content:
                "🌍 O mundo tentou alterar a ficha, mas algo falhou.",

                ephemeral:true

            });

        }


    }

};