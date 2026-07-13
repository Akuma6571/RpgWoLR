// ==========================================
// 🌍 O MUNDO BOT V2
// ARQUIVO PRINCIPAL
// ==========================================


const {
    Client,
    GatewayIntentBits,
    Collection,
    Partials
} = require("discord.js");


const fs = require("fs");

const path = require("path");


const dotenv = require("dotenv");


const database = require("./database/database");



dotenv.config();




// ==========================================
// CONFIGURAÇÃO DO CLIENTE
// ==========================================


const client = new Client({

    intents:[

        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMessages,

        GatewayIntentBits.MessageContent

    ],


    partials:[

        Partials.Channel,

        Partials.Message

    ]

});





// ==========================================
// SISTEMA DE COMANDOS
// ==========================================


client.commands = new Collection();





const pastaComandos = path.join(

    __dirname,

    "commands"

);





if(fs.existsSync(pastaComandos)){


    const arquivos = fs.readdirSync(

        pastaComandos

    )

    .filter(

        arquivo => arquivo.endsWith(".js")

    );




    for(const arquivo of arquivos){


        const comando = require(

            `./commands/${arquivo}`

        );



        if(comando.data){


            client.commands.set(

                comando.data.name,

                comando

            );


        }


    }


}






// ==========================================
// SISTEMA DE EVENTOS
// ==========================================


const pastaEventos = path.join(

    __dirname,

    "events"

);





if(fs.existsSync(pastaEventos)){


    const arquivosEventos = fs.readdirSync(

        pastaEventos

    )

    .filter(

        arquivo => arquivo.endsWith(".js")

    );




    for(const arquivo of arquivosEventos){


        const evento = require(

            `./events/${arquivo}`

        );


        if(evento.once){


            client.once(

                evento.name,

                (...args)=>evento.execute(...args)

            );


        }else{


            client.on(

                evento.name,

                (...args)=>evento.execute(...args)

            );


        }


    }


}
// ==========================================
// INTERAÇÕES
// ==========================================


client.on(

    "interactionCreate",

    async interaction => {


        try{


            // ===============================
            // COMANDOS SLASH
            // ===============================


            if(interaction.isChatInputCommand()){


                const comando = client.commands.get(

                    interaction.commandName

                );



                if(!comando){


                    return interaction.reply({

                        content:
                        "🌍 O Mundo não reconhece este comando.",

                        ephemeral:true

                    });


                }




                await comando.execute(

                    interaction

                );


                return;


            }





            // ===============================
            // BOTÕES
            // ===============================


            if(interaction.isButton()){


                const comandoFicha = client.commands.get(

                    "ficha"

                );



                if(

                    comandoFicha &&

                    comandoFicha.processarBotao

                ){


                    await comandoFicha.processarBotao(

                        interaction

                    );


                }


                return;


            }





        }catch(erro){


            console.error(

                "❌ Erro ao processar interação:",

                erro

            );



            if(!interaction.replied){


                await interaction.reply({

                    content:

                    "🌍 As leis do mundo foram perturbadas. Algo falhou.",

                    ephemeral:true

                });


            }


        }


    }

);







// ==========================================
// BOT ONLINE
// ==========================================


client.once(

    "ready",

    async ()=>{


        console.log(

            "================================"

        );


        console.log(

            "🌍 O Mundo despertou."

        );


        console.log(

            `🤖 Conectado como ${client.user.tag}`

        );


        console.log(

            "================================"

        );


    }

);







// ==========================================
// ERROS GLOBAIS
// ==========================================


process.on(

    "unhandledRejection",

    erro=>{


        console.error(

            "❌ Promise rejeitada:",

            erro

        );


    }

);





process.on(

    "uncaughtException",

    erro=>{


        console.error(

            "❌ Erro crítico:",

            erro

        );


    }

);







// ==========================================
// DESLIGAMENTO SEGURO
// ==========================================


process.on(

    "SIGINT",

    async ()=>{


        console.log(

            "🌍 O Mundo está encerrando sua observação."

        );



        await database.fecharBanco();



        client.destroy();



        process.exit();


    }

);







// ==========================================
// LOGIN
// ==========================================


client.login(

    process.env.TOKEN

);