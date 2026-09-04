const { SlashCommandBuilder } = require('discord.js');
module.exports = { data: new SlashCommandBuilder().setName('teste').setDescription('Teste'), async execute(interaction) { await interaction.reply('ok'); } };
