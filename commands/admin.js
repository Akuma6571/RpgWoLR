// ==========================================
// 🌍 O MUNDO BOT V2
// SISTEMA DEFINITIVO ADMINISTRATIVO
// APENAS O MESTRE
// ==========================================


const {

    SlashCommandBuilder,

    EmbedBuilder

} = require("discord.js");




// ==========================================
// ID DO MESTRE
// ==========================================


const DONO_ID = "806138859053121546";




// ==========================================
// SISTEMAS FUTUROS
// ==========================================


let mundo = null;
let memoria = null;
let eventos = null;


try {

    mundo = require("../systems/mundo/mundo");

} catch(e){}



try {

    memoria = require("../systems/memoria/memoria");

} catch(e){}



try {

    eventos = require("../systems/eventos/eventos");

} catch(e){}









// ==========================================
// FUNÇÕES DE REGISTRO
// ==========================================


async function registrarEvento(tipo, dados){


    try{


        if(eventos && eventos.registrar){


            await eventos.registrar(

                tipo,

                dados

            );


        }


    }catch(erro){


        console.error(

            "Erro ao registrar evento:",

            erro

        );


    }


}









async function registrarMemoria(tipo, dados){


    try{


        if(memoria && memoria.salvar){


            await memoria.salvar(

                tipo,

                dados

            );


        }


    }catch(erro){


        console.error(

            "Erro ao salvar memória:",

            erro

        );


    }


}









async function chamarMundo(tipo, dados){


    try{


        if(mundo && mundo.comentar){


            return await mundo.comentar(

                tipo,

                dados

            );


        }


    }catch(erro){


        console.error(

            "Erro no Mundo:",

            erro

        );


    }


    return null;


}









// ==========================================
// COMANDO ADMIN
// ==========================================


const comandoAdmin = {



data: new SlashCommandBuilder()



.setName("admin")



.setDescription(

    "Comandos exclusivos do mestre."

)







.addSubcommand(sub =>


sub

.setName("xp")

.setDescription(

    "Adicionar XP a um jogador."

)


.addStringOption(option =>


option

.setName("jogador")

.setDescription(

    "Nome do jogador."

)

.setRequired(true)


)


.addIntegerOption(option =>


option

.setName("quantidade")

.setDescription(

    "Quantidade de XP."

)

.setRequired(true)


)


)







.addSubcommand(sub =>


sub

.setName("mundo")

.setDescription(

    "Gerar uma fala do Mundo."

)


.addStringOption(option =>


option

.setName("contexto")

.setDescription(

    "Contexto da fala."

)

.setRequired(true)


)


),







async execute(interaction){



    if(interaction.user.id !== DONO_ID){



        return interaction.reply({



            content:

            "❌ Você não possui autoridade sobre este mundo.",



            ephemeral:true



        });



    }



    const sub = interaction.options.getSubcommand();
// ==========================================
// ADMIN XP
// ==========================================


    if(sub === "xp"){



        const jogador = interaction.options.getString(

            "jogador"

        );



        const quantidade = interaction.options.getInteger(

            "quantidade"

        );








        const dadosXP = {



            jogador,


            quantidade,


            administrador: interaction.user.id,


            data: Date.now()



        };








        await registrarEvento(

            "xp_adicionado",

            dadosXP

        );








        await registrarMemoria(

            "xp_adicionado",

            dadosXP

        );








        const respostaMundo = await chamarMundo(

            "xp_adicionado",

            dadosXP

        );








        const embed = new EmbedBuilder()



        .setTitle(

            "⭐ Experiência concedida"

        )



        .setDescription(


`
🌍 **O Mundo observou uma
// ==========================================
// EXPORTAÇÃO DO SISTEMA ADMIN
// ==========================================


};









module.exports = comandoAdmin;



module.exports.DONO_ID = DONO_ID;



module.exports.registrarEvento = registrarEvento;



module.exports.registrarMemoria = registrarMemoria;



module.exports.chamarMundo = chamarMundo;