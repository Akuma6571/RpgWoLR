// ==========================================
// 🌍 O MUNDO - Discord RPG Bot
// Arquivo principal do bot
// ==========================================

const { 
    Client, 
    GatewayIntentBits, 
    Collection 
} = require("discord.js");

const fs = require("fs");
const path = require("path");
const config = require("./config.json");


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

const commandsPath = path.join(__dirname, "commands");

if (fs.existsSync(commandsPath)) {

    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {

        const command = require(`./commands/${file}`);

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

    console.log("----------------------------------");
    console.log(`🌍 ${config.botName} está online!`);
    console.log(`🤖 Conta: ${client.user.tag}`);
    console.log("----------------------------------");

});


// ==========================================
// EXECUTAR COMANDOS
// ==========================================

client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(
        interaction.commandName
    );

    if (!command) return;

    try {

        await command.execute(interaction);

    } catch (error) {

        console.log(error);

        await interaction.reply({
            content: "❌ Ocorreu um erro ao executar esse comando.",
            ephemeral: true
        });

    }

});


// ==========================================
// ERROS
// ==========================================

client.on("error", error => {

    console.log("Erro no bot:");
    console.log(error);

});


// ==========================================
// LOGIN
// ==========================================

// O token será colocado quando formos testar
client.login("TOKEN_DO_BOT");