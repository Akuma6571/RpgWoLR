const { SlashCommandBuilder } = require('discord.js');
const crypto = require('node:crypto');

function roll(expression) {
  const match = expression.trim().match(/^(\d+)d(\d+)([+-]\d+)?$/i);
  if (!match) throw new Error('invalid');
  const count = Number(match[1]);
  const sides = Number(match[2]);
  const modifier = Number(match[3] || 0);
  if (count < 1 || count > 100 || sides < 2 || sides > 100000) throw new Error('invalid');
  const values = Array.from({ length: count }, () => crypto.randomInt(1, sides + 1));
  return { values, modifier, total: values.reduce((a, b) => a + b, 0) + modifier, sides };
}

function comment(value, sides) {
  if (sides !== 20 || crypto.randomInt(0, 100) >= 20) return null;
  if (value === 1) return crypto.randomInt(0, 2) === 0 ? 'Previsível.' : 'Era isso que você tinha para oferecer?';
  if (value === 2) return 'Interessante. Não confunda isso com elogio.';
  if (value === 20) return 'O acaso, desta vez, foi útil.';
  return null;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rolar')
    .setDescription('Rola dados.')
    .addStringOption(option => option.setName('dados').setDescription('Ex.: 1d20, 2d6, 1d100 ou 1d20+5').setRequired(true)),

  async execute(interaction) {
    const expression = interaction.options.getString('dados', true);
    try {
      const result = roll(expression);
      const details = result.values.map((value, index) => `Dado ${index + 1}: **${value}**`).join('\n');
      const modifier = result.modifier ? `\nModificador: **${result.modifier > 0 ? '+' : ''}${result.modifier}**` : '';
      let response = `🎲 **${expression}**\n${details}${modifier}\n\n**Resultado: ${result.total}**`;
      if (result.values.length === 1) {
        const text = comment(result.values[0], result.sides);
        if (text) response += `\n\n*${text}*`;
      }
      await interaction.reply(response);
    } catch {
      await interaction.reply({ content: 'Formato inválido. Use: `1d20`, `2d6`, `1d100` ou `1d20+5`.', ephemeral: true });
    }
  },
};
