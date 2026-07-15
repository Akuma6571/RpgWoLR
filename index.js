require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials,
    REST,
    Routes
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
        Partials.GuildMember
    ]
});

client.commands = new Collection();

const commands = [];

const commandsPath = path.join(__dirname, "commands");

if (fs.existsSync(commandsPath)) {

    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {

        const command = require(path.join(commandsPath, file));

        if (!command.data || !command.execute) {
            console.warn(`Comando ignorado: ${file}`);
            continue;
        }

        client.commands.set(command.data.name, command);

        commands.push(command.data.toJSON());

    }

}

const eventsPath = path.join(__dirname, "events");

if (fs.existsSync(eventsPath)) {

    const eventFiles = fs
        .readdirSync(eventsPath)
        .filter(file => file.endsWith(".js"));

    for (const file of eventFiles) {

        const event = require(path.join(eventsPath, file));

        if (event.once) {

            client.once(event.name, (...args) => event.execute(...args, client));

        } else {

            client.on(event.name, (...args) => event.execute(...args, client));

        }

    }

}

async function registrarComandos() {

    try {

        const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            {
                body: commands
            }
        );

        console.log(`${commands.length} comandos registrados.`);

    } catch (erro) {

        console.error("Erro ao registrar comandos:", erro);

    }

}

(async () => {

    try {

        await registrarComandos();

        await client.login(process.env.DISCORD_TOKEN);

    } catch (erro) {

        console.error("Falha ao iniciar o bot:", erro);

    }

})();