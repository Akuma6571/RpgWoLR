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
// SERVIDOR PARA O RENDER
// ==========================================

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {

    res.writeHead(200);
    res.end("🌍 O mundo está vivo.");

}).listen(PORT, () => {

    console.log(`🌍 Servidor de verificação ativo na porta ${PORT}`);

});


// ==========================================
// MENSAGENS DO MUNDO
// ==========================================

const mensagens = {

    despertar:
    "🌍 O mundo despertou.",

    semPermissao:
    "🌍 O mundo observa sua tentativa, mas este caminho não lhe foi concedido.",

    comandoDesconhecido:
    "🌍 Nem mesmo o próprio mundo parece reconhecer o que está sendo dito... reveja seus conceitos.",

    erro:
    "🌍 As leis do mundo foram perturbadas. Algo que deveria acontecer não aconteceu.",

    sucesso:
    "🌍 O mundo reconhece sua intenção e responde ao seu chamado."

};


// ==========================================
// CRIAÇÃO DO BOT
// ==========================================

const client = new Client({

    intents: [
        GatewayIntentBits.Guilds
    ]

});


// ==========================================
// SISTEMA DE COMANDOS
// ==========================================

client.commands = new Collection();

const commandsFolder = path.join(
    __dirname,
    "commands"
);


if (fs.existsSync(commandsFolder)) {

    const commandFiles = fs
        .readdirSync(commandsFolder)
        .filter(file => file.endsWith(".js"));


    for (const file of commandFiles) {

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

client.once("ready", () => {

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
// EXECUÇÃO DOS COMANDOS
// ==========================================

client.on(
    "interactionCreate",
    async interaction => {

        if (!interaction.isChatInputCommand()) {
            return;
        }


        const command = client.commands.get(
            interaction.commandName
        );


        if (!command) {

            await interaction.reply({

                content:
                mensagens.comandoDesconhecido,

                ephemeral: true

            });

            return;

        }


        try {

            await command.execute(interaction);


        } catch (error) {

            console.error(error);


            await interaction.reply({

                content:
                mensagens.erro,

                ephemeral: true

            });

        }

    }

);


// ==========================================
// ERROS
// ==========================================

client.on(
    "error",
    error => {

        console.error(
            "🌍 Uma falha desconhecida afetou o mundo:"
        );

        console.error(error);

    }
);


// ==========================================
// LOGIN
// ==========================================

client.login(process.env.TOKEN);