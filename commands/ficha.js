const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");


const database = require("../database/database");





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



        const usuario = interaction.user.id;





        const personagem = await database.buscarUm(

            `

            SELECT *

            FROM jogadores

            WHERE usuario_id=$1

            AND slot=$2

            `,

            [

                usuario,

                slot

            ]        const habilidades = await database.buscarTodos(

            `

            SELECT *

            FROM habilidades

            WHERE personagem_id=$1

            `,

            [

                personagem.id

            ]

        );





        const magias = await database.buscarTodos(

            `

            SELECT *

            FROM magias

            WHERE personagem_id=$1

            `,

            [

                personagem.id

            ]

        );





        const embed = new EmbedBuilder()


        .setTitle(

            `🌍 ${personagem.titulo}`

        )


        .setDescription(

`

━━━━━━━━━━━━━━


👤 **Nome:** ${personagem.nome}

🎂 **Idade:** ${personagem.idade}

📏 **Altura:** ${personagem.altura} cm


🧬 **Raça:** ${personagem.raca}

⚔️ **Classe:** ${personagem.classe}

✨ **Subclasse:** ${personagem.subclasse}


━━━━━━━━━━━━━━


📈 **Nível:** ${personagem.nivel}

⭐ **XP:** ${personagem.xp}


━━━━━━━━━━━━━━

`

        );        embed.addFields(


        {

            name:

            "📊 Estatísticas",


            value:

`
❤️ Vida: ${personagem.vida} | 🛡️ Resistência: ${personagem.resistencia}

💪 Força: ${personagem.forca} | 🏃 Agilidade: ${personagem.agilidade}

🔥 Estamina: ${personagem.estamina} | 🔮 Mana: ${personagem.mana}

🧠 Inteligência: ${personagem.inteligencia} | 🎭 Carisma: ${personagem.carisma}

🌌 Aura: ${personagem.aura} | 🍀 Sorte: ${personagem.sorte}


🎯 **Chance Crítica: ${personagem.chancecritica}%**

`,

            inline:false

        },





        {


            name:

            "✨ Aptidões",


            value:

`
🔮 Mágica: ${personagem.magica}%

🔥 Fogo: ${personagem.fogo}%

🌎 Terra: ${personagem.terra}%

🌪️ Ar: ${personagem.ar}%

💧 Água: ${personagem.agua}%

☀️ Luz: ${personagem.luz}%

🌑 Escuridão: ${personagem.escuridao}%

✨ Secundárias: ${personagem.secundarias}%

`,

            inline:false

        }


        );        let textoHabilidades = "";



        if(habilidades.length === 0){


            textoHabilidades =

            "Nenhuma habilidade aprendida.";


        }else{


            habilidades.forEach(habilidade => {


                textoHabilidades +=

                `• **${habilidade.nome}**\n`;



                if(habilidade.descricao){


                    textoHabilidades +=

                    `  ${habilidade.descricao}\n`;

                }



                textoHabilidades +=

                `  ⭐ XP: ${habilidade.xp} | Nível: ${habilidade.nivel}\n\n`;


            });


        }





        embed.addFields({


            name:

            "⚔️ Habilidades",


            value:

            textoHabilidades,


            inline:false


        });






        let textoMagias = "";



        if(magias.length === 0){


            textoMagias =

            "Nenhuma magia aprendida.";


        }else{


            magias.forEach(magia => {


                textoMagias +=

                `• **${magia.nome}**\n`;



                if(magia.descricao){


                    textoMagias +=

                    `  ${magia.descricao}\n`;

                }



                textoMagias +=

                `  ⭐ XP: ${magia.xp} | Nível: ${magia.nivel}\n\n`;


            });


        }





        embed.addFields({


            name:

            "📖 Magias",


            value:

            textoMagias,


            inline:false


        });        embed.setFooter({

            text:

            "🌍 Toda existência possui uma história. Algumas apenas são mais interessantes de observar."

        });



        embed.setTimestamp();





        await interaction.reply({

            embeds:[embed]

        });





        const mensagem = await interaction.fetchReply();





        await database.executar(

            `

            UPDATE jogadores

            SET mensagem_ficha=$1,

            canal_ficha=$2

            WHERE id=$3

            `,

            [

                mensagem.id,

                mensagem.channel.id,

                personagem.id

            ]

        );



    }


};

        );






        if(!personagem){


            return interaction.reply({

                content:

                "❌ Personagem não encontrado.",

                ephemeral:true

            });


        }