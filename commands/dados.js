const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rolar')
    .setDescription('Rola dados (ex: d20, 3d6+2, 2d10-1)')
    .addStringOption(o => o.setName('dados').setDescription('Notação dos dados').setRequired(true))
    .addBooleanOption(o => o.setName('vantagem').setDescription('Vantagem (apenas d20)'))
    .addBooleanOption(o => o.setName('desvantagem').setDescription('Desvantagem (apenas d20)')),

  async execute(interaction, ctx) {
    const notation = interaction.options.getString('dados');
    const adv = interaction.options.getBoolean('vantagem');
    const disadv = interaction.options.getBoolean('desvantagem');
    const isD20 = /^d20([+-]\d+)?$/i.test(notation.replace(/\s/g, ''));

    let roll;
    if (isD20 && (adv || disadv)) {
      const mod = (notation.match(/([+-]\d+)$/) || [])[1];
      roll = ctx.rollD20(adv, disadv, mod ? parseInt(mod, 10) : 0);
    } else {
      roll = ctx.parseAndRoll(notation);
    }

    if (!roll) {
      return interaction.reply({ content: 'Notação inválida. Exemplos válidos: `d20`, `3d6+2`, `2d10-1`. Eu esperava isso de você.', ephemeral: true });
    }

    const rollsStr = roll.rolls.join(' + ');
    let detail = `[${rollsStr}]`;
    if (roll.modifier) detail += ` ${roll.modifier > 0 ? '+' : '-'} ${Math.abs(roll.modifier)}`;
    let line = `🎲 **${notation}** → **${roll.result}**\n\`${detail}\``;
    if (roll.isCrit) line += '\n✦ **ACERTO CRÍTICO** ✦';
    if (roll.isFumble) line += '\n☠ **FALHA CRÍTICA** ☠';

    const comment = ctx.commentOnRoll(roll);
    return interaction.reply(`${line}\n\n*— O mundo: "${comment}"*`);
  },
};