const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { loadGuild, saveGuild } = require('../utils/storage');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('admin')
    .setDescription('Comandos administrativos (requer permissÃµes de admin)')
    .addSubcommand(s => s.setName('limpar_fichas').setDescription('Apaga TODAS as fichas do servidor'))
    .addSubcommand(s => s.setName('limpar_combates').setDescription('Encerra todos os combates ativos'))
    .addSubcommand(s => s.setName('expulsar').setDescription('Expulsa um membro')
      .addUserOption(o => o.setName('usuario').setDescription('Membro a expulsar').setRequired(true))
      .addStringOption(o => o.setName('motivo').setDescription('Motivo')))
    .addSubcommand(s => s.setName('banir').setDescription('Bane um membro')
      .addUserOption(o => o.setName('usuario').setDescription('Membro a banir').setRequired(true))
      .addStringOption(o => o.setName('motivo').setDescription('Motivo')))
    .addSubcommand(s => s.setName('silenciar').setDescription('Silencia um membro por minutos (timeout)')
      .addUserOption(o => o.setName('usuario').setDescription('Membro a silenciar').setRequired(true))
      .addIntegerOption(o => o.setName('minutos').setDescription('DuraÃ§Ã£o em minutos').setRequired(true).setMinValue(1).setMaxValue(1440)))
    .addSubcommand(s => s.setName('limpar_mensagens').setDescription('Apaga mensagens recentes')
      .addIntegerOption(o => o.setName('quantidade').setDescription('Quantidade (1-100)').setRequired(true).setMinValue(1).setMaxValue(100)))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, ctx) {
    const sub = interaction.options.getSubcommand();
    const data = ctx.loadGuild(interaction.guild.id);

    if (sub === 'limpar_fichas') {
      const total = Object.keys(data.characters).length;
      data.characters = {};
      ctx.saveGuild(interaction.guild.id, data);
      return interaction.reply(`âœ¦ ${total} fichas apagadas. *O mundo zerou seu tabuleiro. Que tÃ©dio.*`);
    }

    if (sub === 'limpar_combates') {
      const total = Object.keys(data.activeCombats).length;
      data.activeCombats = {};
      ctx.saveGuild(interaction.guild.id, data);
      return interaction.reply(`âœ¦ ${total} combates encerrados. *SilÃªncio. Finalmente.*`);
    }

    if (sub === 'expulsar') {
      const user = interaction.options.getUser('usuario');
      const motivo = interaction.options.getString('motivo') || 'Sem motivo.';
      try {
        await interaction.guild.members.kick(user, motivo);
        return interaction.reply(`âœ¦ ${user.tag} foi expulso. *O mundo nÃ£o sentiu falta.*`);
      } catch (e) {
        return interaction.reply({ content: `NÃ£o consegui expulsar ${user.tag}. Provavelmente eu sou mais poderoso que vocÃª. (${e.message})`, ephemeral: true });
      }
    }

    if (sub === 'banir') {
      const user = interaction.options.getUser('usuario');
      const motivo = interaction.options.getString('motivo') || 'Sem motivo.';
      try {
        await interaction.guild.bans.create(user, { reason: motivo });
        return interaction.reply(`âœ¦ ${user.tag} foi banido. *Para sempre. Como deveria ser.*`);
      } catch (e) {
        return interaction.reply({ content: `NÃ£o consegui banir ${user.tag}. (${e.message})`, ephemeral: true });
      }
    }

    if (sub === 'silenciar') {
      const user = interaction.options.getUser('usuario');
      const minutos = interaction.options.getInteger('minutos');
      try {
        const member = await interaction.guild.members.fetch(user);
        await member.timeout(minutos * 60 * 1000, `Silenciado por ${interaction.user.tag}`);
        return interaction.reply(`âœ¦ ${user.tag} silenciado por ${minutos} min. *Finalmente, silÃªncio.*`);
      } catch (e) {
        return interaction.reply({ content: `NÃ£o consegui silenciar ${user.tag}. (${e.message})`, ephemeral: true });
      }
    }

    if (sub === 'limpar_mensagens') {
      const qtd = interaction.options.getInteger('quantidade');
      try {
        const msgs = await interaction.channel.bulkDelete(qtd, true);
        return interaction.reply(`âœ¦ ${msgs.size} mensagens apagadas. *O mundo apaga tudo. Como sempre.*`);
      } catch (e) {
        return interaction.reply({ content: `NÃ£o consegui apagar. (${e.message})`, ephemeral: true });
      }
    }
  },
};