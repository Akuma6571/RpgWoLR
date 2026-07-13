// ==========================================
// 🌍 O MUNDO BOT V2
// SISTEMA DEFINITIVO DE COMBATE
// PREPARADO PARA EXPANSÃO FUTURA
// ==========================================


const {

    SlashCommandBuilder,

    EmbedBuilder

} = require("discord.js");




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
// COMBATES ATIVOS
// ==========================================


const combatesAtivos = {};







// ==========================================
// REGISTRO DE EVENTOS
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









// ==========================================
// MEMÓRIA DO MUNDO
// ==========================================


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









// ==========================================
// COMENTÁRIO DO MUNDO
// ==========================================


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

            "Erro no sistema do Mundo:",

            erro

        );


    }


    return null;


}
// ==========================================
// COMANDO COMBATE
// ==========================================


const comandoCombate = {



data: new SlashCommandBuilder()



.setName("combate")



.setDescription(

    "Sistema de combate do Mundo."

)







.addSubcommand(sub =>



sub

.setName("iniciar")

.setDescription(

    "Inicia um combate."

)



.addStringOption(option =>


option

.setName("criatura")

.setDescription(

    "Nome da criatura enfrentada."

)

.setRequired(true)


)



.addStringOption(option =>


option

.setName("raridade")

.setDescription(

    "Raridade da criatura."

)

.setRequired(true)


)


)







.addSubcommand(sub =>



sub

.setName("finalizar")

.setDescription(

    "Finaliza um combate."

)



.addStringOption(option =>


option

.setName("resultado")

.setDescription(

    "Resultado do combate."

)

.setRequired(true)



.addChoices(

{

name:"Vitória",

value:"vitoria"

},

{

name:"Derrota",

value:"derrota"

},

{

name:"Morte",

value:"morte"

},

{

name:"Fuga",

value:"fuga"

}

)


)



.addStringOption(option =>


option

.setName("alvo")

.setDescription(

    "Nome do alvo."

)

.setRequired(true)


)



.addIntegerOption(option =>


option

.setName("xp")

.setDescription(

    "Quantidade de XP entregue."

)

.setRequired(true)


)


),









// ==========================================
// EXECUÇÃO
// ==========================================


async execute(interaction){



    const sub = interaction.options.getSubcommand();



    const servidor = interaction.guild.id;







// ==========================================
// INICIAR COMBATE
// ==========================================


    if(sub === "iniciar"){



        if(combatesAtivos[servidor]){


            return interaction.reply({


                content:

                "❌ Já existe um combate ativo neste mundo.",


                ephemeral:true


            });


        }








        const criatura = interaction.options.getString(

            "criatura"

        );



        const raridade = interaction.options.getString(

            "raridade"

        );








        const combate = {



            servidor,


            criatura,


            raridade,


            iniciadoPor: interaction.user.id,


            inicio: Date.now()



        };








        combatesAtivos[servidor] = combate;








        await registrarEvento(

            "combate_iniciado",

            combate

        );








        await registrarMemoria(

            "combate_iniciado",

            combate

        );








        await chamarMundo(

            "combate_iniciado",

            combate

        );








        const embed = new EmbedBuilder()



        .setTitle(

            "⚔️ Um combate se inicia"

        )



        .setDescription(


`
🌍 **O Mundo observa.**


Uma nova batalha começa.


👹 **Criatura:**

${criatura}


✨ **Raridade:**

${raridade}


━━━━━━━━━━━━━━━━━━


O destino aguarda o desfecho.

`

        )



        .setTimestamp();








        return interaction.reply({



            embeds:[

                embed

            ]



        });



    }









// ==========================================
// FINALIZAR COMBATE
// ==========================================


    if(sub === "finalizar"){



        const combate = combatesAtivos[servidor];








        if(!combate){



            return interaction.reply({



                content:

                "❌ Não existe combate ativo neste mundo.",



                ephemeral:true



            });



        }








        const resultado = interaction.options.getString(

            "resultado"

        );



        const alvo = interaction.options.getString(

            "alvo"

        );



        const xp = interaction.options.getInteger(

            "xp"

        );








        const resultadoCombate = {



            ...combate,


            alvo,


            resultado,


            xp,


            finalizadoPor: interaction.user.id,


            fim: Date.now()



        };
// ==========================================
// REGISTRO DO FINAL DO COMBATE
// ==========================================


        await registrarEvento(

            "combate_finalizado",

            resultadoCombate

        );








        await registrarMemoria(

            "combate_finalizado",

            resultadoCombate

        );








        const respostaMundo = await chamarMundo(

            "combate_finalizado",

            resultadoCombate

        );








        const embed = new EmbedBuilder()



        .setTitle(

            "⚔️ O combate chegou ao fim"

        )



        .setDescription(


`
🌍 **O Mundo testemunhou o confronto.**


👹 **Criatura:**

${combate.criatura}



✨ **Raridade:**

${combate.raridade}



📜 **Resultado:**

${resultado}



⭐ **Experiência concedida:**

${xp} XP



━━━━━━━━━━━━━━━━━━


${respostaMundo || "O registro desta batalha foi marcado."}

`

        )



        .setTimestamp();








        delete combatesAtivos[servidor];








        return interaction.reply({



            embeds:[

                embed

            ]



        });



    }



}



};









// ==========================================
// EXPORTAÇÕES
// ==========================================


module.exports = comandoCombate;



module.exports.combatesAtivos = combatesAtivos;



module.exports.registrarEvento = registrarEvento;



module.exports.registrarMemoria = registrarMemoria;



module.exports.chamarMundo = chamarMundo;