const { parseAndRoll, rollD20 } = require('./utils/dice');
const { commentOnRoll, commentOnDamage, commentOnHeal, randomInterjection } = require('./utils/narrator');
const { loadGuild, saveGuild } = require('./utils/storage');

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
for (const file of fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'))) {
  const cmd = require(path.join(commandsPath, file));
  if (cmd.data) client.commands.set(cmd.data.name, cmd);
}

client.once(Events.ClientReady, (c) => {
  console.log(`✦ O mundo desperta. Logado como ${c.user.tag}`);
});

// Slash commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = client.commands.get(interaction.commandName);
  if (!cmd) return;
  try {
    await cmd.execute(interaction, { loadGuild, saveGuild, commentOnRoll, commentOnDamage, commentOnHeal, parseAndRoll, rollD20, EmbedBuilder });
  } catch (err) {
    console.error(err);
    const reply = { content: 'O mundo observou seu comando falhar. Patético.', ephemeral: true };
    if (interaction.deferred || interaction.replied) await interaction.followUp(reply).catch(() => {});
    else await interaction.reply(reply).catch(() => {});
  }
});

// Personalidade: interjeções aleatórias e reações a menções
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot || !message.guild) return;
  const content = message.content.toLowerCase();

  // Reage quando é mencionado
  if (message.mentions.has(client.user)) {
    return message.reply(`*${randomInterjection()}*`).catch(() => {});
  }

  // Reage a menções de "o mundo"
  if (/\bo mundo\b/.test(content)) {
    return message.reply(`*${randomInterjection()}*`).catch(() => {});
  }

  // Chance baixa de interjectar espontaneamente (~2%)
  if (Math.random() < 0.02) {
    return message.channel.send(`*${randomInterjection()}*`).catch(() => {});
  }
});

client.login(process.env.DISCORD_TOKEN);