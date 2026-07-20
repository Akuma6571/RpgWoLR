const { SlashCommandBuilder } = require('discord.js');
const { loadGuild, saveGuild, charKey } = require('../utils/storage');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ficha')
    .setDescription('Gerencia fichas de personagem')
    .addSubcommand(s => s.setName('criar').setDescription('Cria uma nova ficha')
      .addStringOption(o => o.setName('nome').setDescription('Nome do personagem').setRequired(true))
      .addStringOption(o => o.setName('classe').setDescription('Classe do personagem'))
      .addStringOption(o => o.setName('raca').setDescription('RaÃ§a do personagem'))
      .addIntegerOption(o => o.setName('nivel').setDescription('NÃ­vel').setMinValue(1))
      .addIntegerOption(o => o.setName('hp_max').setDescription('HP mÃ¡ximo').setMinValue(1))
      .addIntegerOption(o => o.setName('mana_max').setDescription('Mana mÃ¡ximo').setMinValue(0))
      .addIntegerOption(o => o.setName('ataque').setDescription('BÃ´nus de ataque base'))
      .addIntegerOption(o => o.setName('defesa').setDescription('Defesa base'))
      .addIntegerOption(o => o.setName('iniciativa').setDescription('BÃ´nus de iniciativa base')))
    .addSubcommand(s => s.setName('ver').setDescription('Mostra uma ficha')
      .addStringOption(o => o.setName('nome').setDescription('Nome do personagem (suas fichas se vazio)').setRequired(false)))
    .addSubcommand(s => s.setName('listar').setDescription('Lista suas fichas'))
    .addSubcommand(s => s.setName('editar').setDescription('Edita um campo da ficha')
      .addStringOption(o => o.setName('nome').setDescription('Nome do personagem').setRequired(true))
      .addStringOption(o => o.setName('campo').setDescription('Campo a editar').setRequired(true)
        .addChoices(
          { name: 'HP atual', value: 'hp' },
          { name: 'HP mÃ¡ximo', value: 'maxHp' },
          { name: 'Mana atual', value: 'mana' },
          { name: 'Mana mÃ¡ximo', value: 'maxMana' },
          { name: 'NÃ­vel', value: 'nivel' },
          { name: 'Ataque', value: 'ataque' },
          { name: 'Defesa', value: 'defesa' },
          { name: 'Iniciativa', value: 'iniciativa' },
          { name: 'Classe', value: 'classe' },
          { name: 'RaÃ§a', value: 'raca' },
          { name: 'Notas', value: 'notas' },
        ))
      .addStringOption(o => o.setName('valor').setDescription('Novo valor (nÃºmero ou texto)').setRequired(true)))
    .addSubcommand(s => s.setName('condicao').setDescription('Adiciona/remove uma condiÃ§Ã£o')
      .addStringOption(o => o.setName('nome').setDescription('Nome do personagem').setRequired(true))
      .addStringOption(o => o.setName('condicao').setDescription('Nome da condiÃ§Ã£o (ex: envenenado)').setRequired(true)))
    .addSubcommand(s => s.setName('deletar').setDescription('Apaga uma ficha')
      .addStringOption(o => o.setName('nome').setDescription('Nome do personagem').setRequired(true))),

  async execute(interaction, ctx) {
    const sub = interaction.options.getSubcommand();
    const data = ctx.loadGuild(interaction.guild.id);
    const userId = interaction.user.id;

    if (sub === 'criar') {
      const nome = interaction.options.getString('nome');
      const key = charKey(userId, nome);
      if (data.characters[key]) return interaction.reply({ content: `JÃ¡ existe uma ficha chamada **${nome}**. O mundo nÃ£o gosta de repetiÃ§Ãµes.`, ephemeral: true });
      const maxHp = interaction.options.getInteger('hp_max') || 10;
      const maxMana = interaction.options.getInteger('mana_max') || 0;
      data.characters[key] = {
        nome, ownerId: userId,
        classe: interaction.options.getString('classe') || '',
        raca: interaction.options.getString('raca') || '',
        nivel: interaction.options.getInteger('nivel') || 1,
        hp: maxHp, maxHp,
        mana: maxMana, maxMana,
        ataque: interaction.options.getInteger('ataque') || 0,
        defesa: interaction.options.getInteger('defesa') || 0,
        iniciativa: interaction.options.getInteger('iniciativa') || 0,
        atributos: {}, condicoes: [], inventario: [], notas: '',
      };
      ctx.saveGuild(interaction.guild.id, data);
      return interaction.reply(`âœ¦ Ficha de **${nome}** criada. *Mais uma alma insignificante para eu observar.*`);
    }

    if (sub === 'ver') {
      const nome = interaction.options.getString('nome');
      let char = null;
      if (nome) {
        char = data.characters[charKey(userId, nome)];
      } else {
        char = Object.values(data.characters).find(c => c.ownerId === userId);
      }
      if (!char) return interaction.reply({ content: 'Ficha nÃ£o encontrada. O mundo nÃ£o a conhece. Provavelmente porque nÃ£o existe.', ephemeral: true });
      const embed = new ctx.EmbedBuilder()
        .setTitle(`ðŸ“œ ${char.nome}`)
        .setColor(0xc5a059)
        .addFields(
          { name: 'Identidade', value: [char.raca, char.classe, `NÃ­vel ${char.nivel}`].filter(Boolean).join(' Â· ') || 'â€”' },
          { name: 'HP', value: `${char.hp}/${char.maxHp}`, inline: true },
          { name: 'Mana', value: `${char.mana}/${char.maxMana}`, inline: true },
          { name: 'Ataque', value: `${char.ataque}`, inline: true },
          { name: 'Defesa', value: `${char.defesa}`, inline: true },
          { name: 'Iniciativa', value: `${char.iniciativa}`, inline: true },
          { name: 'CondiÃ§Ãµes', value: char.condicoes.length ? char.condicoes.join(', ') : 'Nenhuma' },
        );
      if (char.notas) embed.addFields({ name: 'Notas', value: char.notas });
      return interaction.reply({ embeds: [embed] });
    }

    if (sub === 'listar') {
      const mine = Object.values(data.characters).filter(c => c.ownerId === userId);
      if (!mine.length) return interaction.reply({ content: 'VocÃª nÃ£o tem fichas. Triste. Como tudo que vocÃª faz.', ephemeral: true });
      return interaction.reply(`**Suas fichas:**\n${mine.map(c => `â€¢ **${c.nome}** â€” ${[c.raca, c.classe].filter(Boolean).join(' ') || 'personagem'} (HP ${c.hp}/${c.maxHp})`).join('\n')}`);
    }

    if (sub === 'editar') {
      const nome = interaction.options.getString('nome');
      const campo = interaction.options.getString('campo');
      const valor = interaction.options.getString('valor');
      const key = charKey(userId, nome);
      const char = data.characters[key];
      if (!char) return interaction.reply({ content: 'Ficha nÃ£o encontrada.', ephemeral: true });
      const numericos = ['hp', 'maxHp', 'mana', 'maxMana', 'nivel', 'ataque', 'defesa', 'iniciativa'];
      if (numericos.includes(campo)) {
        char[campo] = Number(valor);
        if (campo === 'maxHp' && char.hp > char.maxHp) char.hp = char.maxHp;
        if (campo === 'maxMana' && char.mana > char.maxMana) char.mana = char.maxMana;
      } else {
        char[campo] = valor;
      }
      ctx.saveGuild(interaction.guild.id, data);
      return interaction.reply(`âœ¦ **${nome}** atualizado: ${campo} = ${valor}`);
    }

    if (sub === 'condicao') {
      const nome = interaction.options.getString('nome');
      const cond = interaction.options.getString('condicao');
      const key = charKey(userId, nome);
      const char = data.characters[key];
      if (!char) return interaction.reply({ content: 'Ficha nÃ£o encontrada.', ephemeral: true });
      const idx = char.condicoes.indexOf(cond);
      if (idx >= 0) { char.condicoes.splice(idx, 1); }
      else { char.condicoes.push(cond); }
      ctx.saveGuild(interaction.guild.id, data);
      return interaction.reply(`âœ¦ **${nome}** â€” condiÃ§Ãµes: ${char.condicoes.length ? char.condicoes.join(', ') : 'nenhuma'}. *PatÃ©tico, com ou sem.*`);
    }

    if (sub === 'deletar') {
      const nome = interaction.options.getString('nome');
      const key = charKey(userId, nome);
      if (!data.characters[key]) return interaction.reply({ content: 'Ficha nÃ£o encontrada.', ephemeral: true });
      delete data.characters[key];
      ctx.saveGuild(interaction.guild.id, data);
      return interaction.reply(`âœ¦ A ficha de **${nome}** foi apagada. *Como se nunca tivesse existido. Mais fÃ¡cil para mim.*`);
    }
  },
};