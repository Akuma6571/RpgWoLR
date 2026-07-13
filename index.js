// ==========================================
// 🌍 O MUNDO - Discord RPG Bot
// Arquivo principal
// ==========================================


const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");


const fs = require("fs");

const path = require("path");

const http = require("http");

const config = require("./config.json");



// ==========================================
// BANCO DE DADOS
// ==========================================

require("./Database/database");




// ==========================================
// SERVIDOR PARA O RENDER
// ==========================================

const PORT = process.env.PORT || 3000;


http.createServer((req,res)=>{


    res.writeHead(200);

    res.end(
        "🌍 O mundo está vivo."
    );


}).listen(PORT,()=>{


    console.log(
        `🌍 Servidor ativo na porta ${PORT}`
    );


});





// ==========================================
// MENSAGENS DO MUNDO
// ==========================================


const mensagens = {


    despertar:

    "🌍 O mundo despertou.",



    comandoDesconhecido:

    "🌍 Nem mesmo o próprio mundo reconhece este comando.",



    erro:

    "🌍 As leis do mundo foram perturbadas."

};







// ==========================================
// CRIAÇÃO DO BOT
// ==========================================


const client = new Client({


    intents:[

        GatewayIntentBits.Guilds

    ]


});






// ==========================================
// COMANDOS
// ==========================================


client.commands = new Collection();



const commandsFolder = path.join(

    __dirname,

    "commands"

);





if(fs.existsSync(commandsFolder)){



    const commandFiles = fs

    .readdirSync(commandsFolder)

    .filter(file => file.endsWith(".js"));





    for(const file of commandFiles){



        const command = require(

            `./commands/${file}`

        );



        client.commands.set(

            command.data.name,

            command

        );


    }


}








// ==========================================
// BOT ONLINE
// ==========================================


client.once("ready",()=>{


    console.log("==============================");


    console.log(

        mensagens.despertar

    );


    console.log(

        `🌍 Nome: ${config.botName}`

    );


    console.log(

        `🤖 Conta: ${client.user.tag}`

    );


    console.log("==============================");


});








// ==========================================
// INTERAÇÕES
// ==========================================


client.on(

"interactionCreate",

async interaction => {



    // ======================================
    // BOTÕES DA FICHA
    // ======================================


    if(interaction.isButton()){



        const ficha = require(

            "./commands/ficha"

        );



        const dados = ficha.fichasAtivas.get(

            interaction.user.id

        );





        if(!dados){



            return interaction.reply({


                content:

                "❌ Esta ficha expirou. Use /ficha novamente.",


                ephemeral:true


            });


        }







        let embed;





        switch(interaction.customId){



            case "ficha_resumo":



                embed = ficha.paginas.resumo(

                    dados.personagem

                );


            break;







            case "ficha_aptidoes":



                embed = ficha.paginas.aptidoes(

                    dados.personagem

                );


            break;







            case "ficha_habilidades":



                embed = ficha.paginas.habilidades(

                    dados.habilidades

                );


            break;







            case "ficha_magias":



                embed = ficha.paginas.magias(

                    dados.magias

                );


            break;







            default:


                return;


        }








        await interaction.update({



            embeds:[embed],



            components:[

                interaction.message.components[0]

            ]


        });



        return;


    }








    // ======================================
    // COMANDOS SLASH
    // ======================================


    if(!interaction.isChatInputCommand()){

        return;

    }







    const command = client.commands.get(

        interaction.commandName

    );







    if(!command){



        return interaction.reply({



            content:

            mensagens.comandoDesconhecido,



            ephemeral:true



        });


    }







    try{



        await command.execute(

            interaction

        );





    }catch(error){



        console.error(error);





        if(interaction.replied || interaction.deferred){



            return;


        }





        await interaction.reply({



            content:

            mensagens.erro,



            ephemeral:true



        });


    }



}

);








// ==========================================
// ERROS
// ==========================================


client.on(

"error",

error=>{


    console.error(

        "🌍 Erro no mundo:",

        error

    );


}

);








// ==========================================
// LOGIN
// ==========================================


client.login(

    process.env.TOKEN

);