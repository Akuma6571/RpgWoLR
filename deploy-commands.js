// Registra os slash commands no Discord. Rode com: npm run deploy
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
for (const file of fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'))) {
  const cmd = require(path.join(commandsPath, file));
  if (cmd.data) commands.push(cmd.data.toJSON());
}

const rest = new REST({ version: '10' }).settoken(process.env.MTUyNTY3MTYyNjMyMTAzOTQ3Mg.GFqbbD.hCw-t5hd_dVLWwBrrjmMsfsa3ElTB8zpW2H_Dc);

(async () => {
  try {
    console.log(`Registrando ${commands.length} comandos...`);
    if (process.env.GUILD_ID) {
      await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
    } else {
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    }
    console.log('✦ Comandos registrados. O mundo aprova (relutantemente).');
  } catch (err) {
    console.error(err);
  }
})();