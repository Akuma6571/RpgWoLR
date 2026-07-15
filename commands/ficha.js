// ==========================================
// 🌍 O MUNDO BOT V2
// SISTEMA DEFINITIVO DE FICHA
// ==========================================


const {

    SlashCommandBuilder,

    EmbedBuilder,

    ActionRowBuilder,

    ButtonBuilder,

    ButtonStyle

} = require("discord.js");



const database = require("../database/database");





// ==========================================
// BOTÕES DA FICHA
// ==========================================


function criarBotoes(){


    return new ActionRowBuilder()

    .addComponents(


        new ButtonBuilder()

        .setCustomId("ficha_resumo")

        .setLabel("📊 Resumo")

        .setStyle(ButtonStyle.Primary),



        new ButtonBuilder()

        .setCustomId("ficha_aptidoes")

        .setLabel("✨ Aptidões")

        .setStyle(ButtonStyle.Primary),



        new ButtonBuilder()

        .setCustomId("ficha_habilidades")

        .setLabel("⚔️ Habilidades")

        .setStyle(ButtonStyle.Success),



        new ButtonBuilder()

        .setCustomId("ficha_magias")

        .setLabel("📖 Magias")

        .setStyle(ButtonStyle.Danger)


    );


}









// ==========================================
// PÁGINA RESUMO
// ==========================================


function paginaResumo(personagem){



    return new EmbedBuilder()



    .setTitle(

        `🌍 ${personagem.titulo || personagem.nome}`

    )



    .setDescription(


`
━━━━━━━━━━━━━━━━━━


👤 **Nome:** ${personagem.nome}

🎂 **Idade:** ${personagem.idade}

📏 **Altura:** ${personagem.altura} cm



🧬 **Raça:** ${personagem.raca}

⚔️ **Classe:** ${personagem.classe}

✨ **Subclasse:** ${personagem.subclasse || "Nenhuma"}



━━━━━━━━━━━━━━━━━━



📈 **Nível:** ${personagem.nivel}

⭐ **XP:** ${personagem.xp}



━━━━━━━━━━━━━━━━━━



❤️ Vida: ${personagem.vida} | 🛡️ Resistência: ${personagem.resistencia}


💪 Força: ${personagem.forca} | 🏃 Agilidade: ${personagem.agilidade}


🧗 Estamina: ${personagem.estamina} | 🔮 Mana: ${personagem.mana}


🧠 Inteligência: ${personagem.inteligencia} | 🎭 Carisma: ${personagem.carisma}


🌌 Aura: ${personagem.aura} | 🍀 Sorte: ${personagem.sorte}



🎯 **Chance Crítica:** ${personagem.chancecritica}%



━━━━━━━━━━━━━━━━━━


🌍 *Toda existência possui uma história.*

`

    )



    .setTimestamp();



}









// ==========================================
// PÁGINA DE APTIDÕES
// ==========================================


function paginaAptidoes(personagem){



    return new EmbedBuilder()



    .setTitle(

        "✨ Aptidões"

    )



    .setDescription(


`
☄️ **Mágica:** ${personagem.magica}%


🔥 **Fogo:** ${personagem.fogo}%


🪨 **Terra:** ${personagem.terra}%


🌪️ **Ar:** ${personagem.ar}%


🌊 **Água:** ${personagem.agua}%


☀️ **Luz:** ${personagem.luz}%


🌑 **Escuridão:** ${personagem.escuridao}%


🃏 **Secundárias:** ${personagem.secundarias}%


`

    );



}
// ==========================================
// PÁGINA DE HABILIDADES
// ==========================================


function paginaHabilidades(habilidades){



    let texto = "";





    if(!habilidades || habilidades.length === 0){



        texto =

        "⚔️ Nenhuma habilidade aprendida.";



    }else{



        habilidades.forEach(habilidade => {



            texto +=


`
⚔️ **${habilidade.nome}**

📈 Nível: ${habilidade.nivel}


${habilidade.descricao || "Sem descrição."}


━━━━━━━━━━━━━━━━━━

`;



        });



    }






    return new EmbedBuilder()



    .setTitle(

        "⚔️ Habilidades"

    )



    .setDescription(

        texto

    )



    .setTimestamp();



}









// ==========================================
// PÁGINA DE MAGIAS
// ==========================================


function paginaMagias(magias){



    let texto = "";






    if(!magias || magias.length === 0){



        texto =

        "📖 Nenhuma magia aprendida.";



    }else{



        magias.forEach(magia => {



            texto +=



`
📖 **${magia.nome}**

📈 Nível: ${magia.nivel}


${magia.descricao || "Sem descrição."}


━━━━━━━━━━━━━━━━━━

`;



        });



    }






    return new EmbedBuilder()



    .setTitle(

        "📖 Magias"

    )



    .setDescription(

        texto

    )



    .setTimestamp();



}









// ==========================================
// BUSCAR DADOS COMPLETOS DO PERSONAGEM
// ==========================================


async function buscarFichaCompleta(usuario, slot){



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

]

);





    if(!personagem){



        return null;



    }








    const habilidades = await database.buscarTodos(



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






    return {



        personagem,


        habilidades,


        magias



    };



}









// ==========================================
// ATUALIZAR FICHA EXISTENTE
// ==========================================


async function atualizarFichaMensagem(client, personagemId){



    const personagem = await database.buscarUm(



`
SELECT *

FROM jogadores

WHERE id=$1

`,


[

personagemId

]

);





    if(!personagem){



        return;



    }







    if(!personagem.mensagem_ficha || !personagem.canal_ficha){



        return;



    }







    const canal = await client.channels.fetch(



        personagem.canal_ficha



    );








    const mensagem = await canal.messages.fetch(



        personagem.mensagem_ficha



    );








    const dados = await buscarFichaCompleta(



        personagem.usuario_id,

        personagem.slot



    );








    await mensagem.edit({



        embeds:[

            paginaResumo(

                dados.personagem

            )

        ],



        components:[

            criarBotoes()

        ]



    });



}
// ==========================================
// COMANDO /FICHA
// ==========================================


const comandoFicha = {



    data: new SlashCommandBuilder()



    .setName("ficha")



    .setDescription(

        "Abre a ficha de um personagem."

    )





    .addIntegerOption(option =>



        option

        .setName("slot")

        .setDescription(

            "Número do personagem (1 até 3)."

        )

        .setRequired(true)



    ),







    async execute(interaction){





        const usuario = interaction.user.id;



        const slot = interaction.options.getInteger(

            "slot"

        );








        if(slot < 1 || slot > 3){



            return interaction.reply({



                content:

                "❌ O slot deve estar entre 1 e 3.",



                ephemeral:true



            });



        }








        const dados = await buscarFichaCompleta(



            usuario,

            slot



        );







        if(!dados){



            return interaction.reply({



                content:

                "❌ Nenhum personagem encontrado nesse slot.",



                ephemeral:true



            });



        }








        const personagem = dados.personagem;








        const mensagem = await interaction.reply({



            embeds:[



                paginaResumo(

                    personagem

                )



            ],



            components:[



                criarBotoes()



            ],



            fetchReply:true



        });








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








    },









// ==========================================
// PROCESSAR BOTÕES DA FICHA
// ==========================================


    async processarBotao(interaction){



        const mensagemId = interaction.message.id;








        const personagem = await database.buscarUm(



`
SELECT *

FROM jogadores

WHERE mensagem_ficha=$1

`,


[

mensagemId

]

);








        if(!personagem){



            return interaction.reply({



                content:

                "❌ Essa ficha não está vinculada.",



                ephemeral:true



            });



        }








        const dados = await buscarFichaCompleta(



            personagem.usuario_id,

            personagem.slot



        );








        let embed;








        switch(interaction.customId){



            case "ficha_resumo":



                embed = paginaResumo(

                    dados.personagem

                );



            break;







            case "ficha_aptidoes":



                embed = paginaAptidoes(

                    dados.personagem

                );



            break;







            case "ficha_habilidades":



                embed = paginaHabilidades(

                    dados.habilidades

                );



            break;







            case "ficha_magias":



                embed = paginaMagias(

                    dados.magias

                );



            break;







            default:



                return;



        }








        await interaction.update({



            embeds:[



                embed



            ],



            components:[



                criarBotoes()



            ]



        });



    }



};
// ==========================================
// EXPORTAÇÃO DO SISTEMA DE FICHA
// ==========================================


module.exports = {



    data: comandoFicha.data,



    execute: comandoFicha.execute,



    processarBotao: comandoFicha.processarBotao,



    criarBotoes,



    atualizarFichaMensagem,



    paginas:{



        resumo: paginaResumo,



        aptidoes: paginaAptidoes,



        habilidades: paginaHabilidades,



        magias: paginaMagias



    }



};