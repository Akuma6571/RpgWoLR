// =====================================
// O MUNDO - Discord RPG Bot
// Arquivo principal
// =====================================

// Importa a biblioteca do Discord
const { Client, GatewayIntentBits } = require("discord.js");

// Cria o bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

// Quando o bot ligar
client.once("ready", () => {
    console.log(`🌍 O mundo está online como ${client.user.tag}`);
});

// Login do bot
// O token será colocado depois de forma segura
client.login("SEU_TOKEN_AQUI");
