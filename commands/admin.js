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
// SISTEMAS DO MUNDO
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
// REGISTRAR EVENTOS
// ==========================================


async function registrarEvento(tipo, dados){


    try{


        if(eventos?.registrar){


            await eventos.registrar(

                tipo,

                dados

            );


        }


    }catch(erro){


        console.error(

            "Erro evento:",

            erro

        );


    }


}









// ==========================================
// REGISTRAR MEMÓRIA
// ==========================================


async function registrarMemoria(tipo, dados){


    try{


        if(memoria?.salvar){


            await memoria.salvar(

                tipo,

                dados

            );


        }


    }catch(erro){


        console.error(

            "Erro memória:",

            erro

        );


    }


}









// ==========================================
// CHAMAR O MUNDO
// ==========================================


async function chamarMundo(tipo, dados){


    try{


        if(mundo?.comentar){


            return await mundo.comentar(

                tipo,

                dados

            );


        }


    }catch(erro){


        console.error(

            "Erro Mundo:",

            erro

        );


    }


    return null;


}
// ==========================================
// COMANDO ADMINISTRATIVO
// ==========================================


const comandoAdmin = {



data: new SlashCommandBuilder()



.setName("admin")



.setDescription(

    "Comandos exclusivos do mestre."

)









// ==========================================
// XP
// ==========================================


.addSubcommand(sub =>



sub

.setName("xp")

.setDescription(

    "Adicionar experiência a um jogador."

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









// ==========================================
// FALA DO MUNDO
// ==========================================


.addSubcommand(sub =>



sub

.setName("mundo")

.setDescription(

    "Fazer O Mundo se manifestar."

)



.addStringOption(option =>


option

.setName("contexto")

.setDescription(

    "Situação que O Mundo deve comentar."

)

.setRequired(true)


)



)









// ==========================================
// HABILIDADE
// ==========================================


.addSubcommand(sub =>



sub

.setName("habilidade")

.setDescription(

    "Gerenciar habilidades."

)



.addStringOption(option =>


option

.setName("acao")

.setDescription(

    "Adicionar ou remover."

)

.setRequired(true)



.addChoices(

{

name:"Adicionar",

value:"adicionar"

},

{

name:"Remover",

value:"remover"

}

)



)



.addStringOption(option =>


option

.setName("jogador")

.setDescription(

    "Jogador da habilidade."

)

.setRequired(true)


)



.addStringOption(option =>


option

.setName("nome")

.setDescription(

    "Nome da habilidade."

)

.setRequired(true)


)



.addIntegerOption(option =>


option

.setName("nivel")

.setDescription(

    "Nível da habilidade."

)

.setRequired(false)


)



)









// ==========================================
// MAGIA
// ==========================================


.addSubcommand(sub =>



sub

.setName("magia")

.setDescription(

    "Gerenciar magias."

)



.addStringOption(option =>


option

.setName("acao")

.setDescription(

    "Adicionar ou remover."

)

.setRequired(true)



.addChoices(

{

name:"Adicionar",

value:"adicionar"

},

{

name:"Remover",

value:"remover"

}

)



)



.addStringOption(option =>


option

.setName("jogador")

.setDescription(

    "Jogador da magia."

)

.setRequired(true)


)



.addStringOption(option =>


option

.setName("nome")

.setDescription(

    "Nome da magia."

)

.setRequired(true)


)



.addIntegerOption(option =>


option

.setName("nivel")

.setDescription(

    "Nível da magia."

)

.setRequired(false)


)



)
// ==========================================
// EXECUÇÃO
// ==========================================


async execute(interaction){



    // ======================================
    // SEGURANÇA DO MESTRE
    // ======================================


    if(interaction.user.id !== DONO_ID){



        return interaction.reply({



            content:

            "❌ Você não possui autoridade sobre este mundo.",



            ephemeral:true



        });



    }








    const sub = interaction.options.getSubcommand();








    // ======================================
    // DAR XP
    // ======================================


    if(sub === "xp"){



        const jogador = interaction.options.getString(

            "jogador"

        );



        const quantidade = interaction.options.getInteger(

            "quantidade"

        );








        const dados = {



            jogador,


            quantidade,


            administrador: interaction.user.id,


            data: Date.now()



        };








        await registrarEvento(

            "xp_adicionado",

            dados

        );








        await registrarMemoria(

            "xp_adicionado",

            dados

        );








        const fala = await chamarMundo(

            "xp_adicionado",

            dados

        );








        return interaction.reply({



            embeds:[



                new EmbedBuilder()



                .setTitle(

                    "⭐ Experiência concedida"

                )



                .setDescription(


`
🌍 O Mundo observou uma alteração.


👤 Jogador:

${jogador}



⭐ XP recebido:

${quantidade}



━━━━━━━━━━━━━━━━━━


${fala || "O destino foi alterado."}

`

                )



                .setTimestamp()



            ]



        });



    }









    // ======================================
    // FALA MANUAL DO MUNDO
    // ======================================


    if(sub === "mundo"){



        const contexto = interaction.options.getString(

            "contexto"

        );








        const dados = {



            contexto,


            administrador: interaction.user.id,


            data: Date.now()



        };








        await registrarEvento(

            "fala_manual",

            dados

        );








        await registrarMemoria(

            "fala_manual",

            dados

        );








        const fala = await chamarMundo(

            "fala_manual",

            dados

        );








        return interaction.reply({



            embeds:[



                new EmbedBuilder()



                .setTitle(

                    "🌍 O Mundo se manifesta"

                )



                .setDescription(


`
${fala || contexto}


━━━━━━━━━━━━━━━━━━


📜 Registro realizado.

`

                )



                .setTimestamp()



            ]



        });



    }









    // ======================================
    // HABILIDADES
    // ======================================


    if(sub === "habilidade"){



        const acao = interaction.options.getString(

            "acao"

        );



        const jogador = interaction.options.getString(

            "jogador"

        );



        const nome = interaction.options.getString(

            "nome"

        );



        const nivel = interaction.options.getInteger(

            "nivel"

        ) || 1;








        const dados = {



            jogador,


            habilidade:nome,


            nivel,


            acao,


            administrador:interaction.user.id,


            data:Date.now()



        };








        await registrarEvento(

            "habilidade_modificada",

            dados

        );








        await registrarMemoria(

            "habilidade_modificada",

            dados

        );








        return interaction.reply({



            content:

            `⚔️ Habilidade ${acao}: ${nome} (${jogador}) nível ${nivel}.`,



            ephemeral:false



        });



    }









    // ======================================
    // MAGIAS
    // ======================================


    if(sub === "magia"){



        const acao = interaction.options.getString(

            "acao"

        );



        const jogador = interaction.options.getString(

            "jogador"

        );



        const nome = interaction.options.getString(

            "nome"

        );



        const nivel = interaction.options.getInteger(

            "nivel"

        ) || 1;








        const dados = {



            jogador,


            magia:nome,


            nivel,


            acao,


            administrador:interaction.user.id,


            data:Date.now()



        };








        await registrarEvento(

            "magia_modificada",

            dados

        );








        await registrarMemoria(

            "magia_modificada",

            dados

        );








        return interaction.reply({



            content:

            `📖 Magia ${acao}: ${nome} (${jogador}) nível ${nivel}.`,



            ephemeral:false



        });



    }
// ==========================================
// CASO NENHUM COMANDO SEJA ENCONTRADO
// ==========================================


    return interaction.reply({



        content:

        "❌ Este comando administrativo ainda não existe.",



        ephemeral:true



    });



}



};









// ==========================================
// EXPORTAÇÕES
// ==========================================


module.exports = comandoAdmin;



module.exports.DONO_ID = DONO_ID;



module.exports.registrarEvento = registrarEvento;



module.exports.registrarMemoria = registrarMemoria;



module.exports.chamarMundo = chamarMundo;