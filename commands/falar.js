const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('falar')
    .setDescription('Faz O Mundo dizer exatamente o que o mestre escreveu.')
    .addStringOption(option =>
      option
        .setName('texto')
        .setDescription('Texto que O Mundo deve enviar.')
        .setRequired(true)
        .setMaxLength(2000)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const texto = interaction.options.getString('texto', true);
    await interaction.reply({ content: texto });
  },
};
