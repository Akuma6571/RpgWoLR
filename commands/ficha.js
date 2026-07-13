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





        const texto = Ficha.formatar(formatar(ficha){


    const p = ficha.personagem;

    const a = ficha.atributos;

    const ap = ficha.aptidoes;



    let texto = `

🌍 **${p.titulo}**

━━━━━━━━━━━━━━


👤 **Nome:** ${p.nome}

🎂 **Idade:** ${p.idade}

📏 **Altura:** ${p.altura} cm


🧬 **Raça:** ${p.raca}

⚔️ **Classe:** ${p.classe}

✨ **Subclasse:** ${p.subclasse}


━━━━━━━━━━━━━━


📈 **Nível:** ${p.nivel}

⭐ **XP:** ${p.xp}/${p.xp_proximo}


━━━━━━━━━━━━━━


❤️ **Vida:** ${a.vida} | 🛡️ **Resistência:** ${a.resistencia}


💪 **Força:** ${a.forca} | 🏃 **Agilidade:** ${a.agilidade}


🔥 **Estamina:** ${a.estamina} | 🔮 **Mana:** ${a.mana}


🧠 **Inteligência:** ${a.inteligencia} | 🎭 **Carisma:** ${a.carisma}


🌌 **Aura:** ${a.aura} | 🍀 **Sorte:** ${a.sorte}


🎯 **Chance Crítica:** ${a.chance_critica}%


━━━━━━━━━━━━━━


✨ **APTIDÕES**


🔮 Mágica: ${ap.magica}%

🔥 Fogo: ${ap.fogo}%

🌎 Terra: ${ap.terra}%

🌪️ Ar: ${ap.ar}%

💧 Água: ${ap.agua}%

☀️ Luz: ${ap.luz}%

🌑 Escuridão: ${ap.escuridao}%

✨ Secundárias: ${ap.secundarias}%


━━━━━━━━━━━━━━


📖 **MAGIAS**

`;



    if(

        ficha.magias.length === 0

    ){

        texto += "Nenhuma\n";


    }else{


        ficha.magias.forEach(magia => {


            texto +=

            `• ${magia.nome} (${magia.xp} XP)\n`;


        });


    }





    texto += `


━━━━━━━━━━━━━━


⚔️ **HABILIDADES**

`;





    if(

        ficha.habilidades.length === 0

    ){

        texto += "Nenhuma\n";


    }else{


        ficha.habilidades.forEach(habilidade => {


            texto +=

            `• ${habilidade.nome} (${habilidade.xp} XP)\n`;


        });


    }





    texto += `


━━━━━━━━━━━━━━


🌍 *"Toda existência possui uma história. Algumas apenas são mais interessantes de observar."*

`;



    return texto;


}

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