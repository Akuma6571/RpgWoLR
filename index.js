const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
require('dotenv').config();

const PORT = Number(process.env.PORT || 10000);
const healthServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('O Mundo está ativo.');
});
healthServer.listen(PORT, '0.0.0.0', () => {
  console.log(`✦ Servidor de verificação ativo na porta ${PORT}.`);
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
if (!fs.existsSync(commandsPath)) throw new Error('A pasta commands não existe.');

for (const file of fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))) {
  const command = require(path.join(commandsPath, file));
  if (command.data && command.execute) client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, c => {
  console.log(`✦ O Mundo despertou. Logado como ${c.user.tag}.`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    const response = { content: 'O comando falhou.', ephemeral: true };
    if (interaction.replied || interaction.deferred) await interaction.followUp(response).catch(() => {});
    else await interaction.reply(response).catch(() => {});
  }
});

if (!process.env.DISCORD_TOKEN) throw new Error('DISCORD_TOKEN não configurado.');

client.login(process.env.DISCORD_TOKEN).catch(error => {
  console.error('✦ Não foi possível conectar o O Mundo ao Discord:', error.message);
});
