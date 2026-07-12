// ==========================================
// 🌍 O MUNDO - Discord RPG Bot
// Arquivo principal do bot
// ==========================================

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const config = require("./config.json");

// Criação do cliente do Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

// Coleção onde os comandos serão armazenados
client.commands = new Collection();


// ==========================================
// EVENTO: BOT ONLINE
// ==========================================

client.once("ready", () => {
    console.log("----------------------------------");
    console.log(`🌍 ${config.botName} está online!`);
    console.log(`🤖 Conta: ${client.user.tag}`);
    console.log("----------------------------------");
});


// ==========================================
// TRATAMENTO DE ERROS
// ==========================================

client.on("error", (error) => {
    console.log("❌ Erro no bot:");
    console.log(error);
});


// ==========================================
// LOGIN DO BOT
// ==========================================

// O token será colocado quando formos testar
client.login("TOKEN_DO_BOT");