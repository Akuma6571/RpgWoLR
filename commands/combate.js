// ==========================================
// 🌍 O MUNDO BOT V2
// SISTEMA DEFINITIVO DE COMBATE
// PREPARADO PARA MEMÓRIA E SISTEMAS FUTUROS
// ==========================================


const {

    SlashCommandBuilder,

    EmbedBuilder

} = require("discord.js");




// Sistemas futuros
// Serão ativados quando forem criados


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


let combatesAtivos = {};









// ==========================================
// REGISTRAR EVENTO DO MUNDO
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
// CHAMAR O MUNDO
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

            "Erro no Mundo:",

            erro

        );


    }


    return null;


}
// ==========================================
// COMANDO COMBATE
// ==========================================


module.exports = {



data: new SlashCommandBuilder()



.setName("combate")



.setDescription(

    "Sistema de combate do Mundo."

)







// ==========================================
// INICIAR COMBATE
// ==========================================


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







// ==========================================
// FINALIZAR COMBATE
// ==========================================


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

    "Alvo do combate."

)

.setRequired(true)


)



.addIntegerOption(option =>


option

.setName("xp")

.setDescription(

    "XP entregue."

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
// INICIAR
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
// FINALIZAR
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
// ==========================================
// FINALIZAÇÃO DO COMBATE
// ==========================================


        const resultadoCombate = {



            ...combate,


            resultado,


            alvo,


            xp,


            finalizadoPor: interaction.user.id,


            fim: Date.now()



        };








        await registrarEvento(

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
// EXPORTAÇÕES FUTURAS
// ==========================================


module.exports.combatesAtivos = combatesAtivos;



module.exports.registrarEvento = registrarEvento;



module.exports.chamarMundo = chamarMundo;