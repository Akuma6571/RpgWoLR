const { SlashCommandBuilder } = require('discord.js');
const { loadGuild, saveGuild, charKey } = require('../utils/storage');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('combate')
    .setDescription('Sistema de combate')
    .addSubcommand(s => s.setName('iniciar').setDescription('Inicia um combate no canal')
      .addStringOption(o => o.setName('nome').setDescription('Nome do combate').setRequired(true)))
    .addSubcommand(s => s.setName('adicionar').setDescription('Adiciona um personagem ou NPC ao combate ativo')
      .addStringOption(o => o.setName('nome').setDescription('Nome do participante').setRequired(true))
      .addIntegerOption(o => o.setName('hp').setDescription('HP (para NPCs)').setMinValue(1))
      .addStringOption(o => o.setName('ficha').setDescription('Nome da sua ficha para usar HP/atributos')))
    .addSubcommand(s => s.setName('iniciativa').setDescription('Rola iniciativa para todos os participantes'))
    .addSubcommand(s => s.setName('dano').setDescription('Causa dano a um participante')
      .addStringOption(o => o.setName('alvo').setDescription('Nome do alvo').setRequired(true))
      .addIntegerOption(o => o.setName('valor').setDescription('Dano (positivo)').setRequired(true).setMinValue(1)))
    .addSubcommand(s => s.setName('curar').setDescription('Cura um participante')
      .addStringOption(o => o.setName('alvo').setDescription('Nome do alvo').setRequired(true))
      .addIntegerOption(o => o.setName('valor').setDescription('Cura (positivo)').setRequired(true).setMinValue(1)))
    .addSubcommand(s => s.setName('turno').setDescription('AvanÃ§a para o prÃ³ximo turno'))
    .addSubcommand(s => s.setName('encerrar').setDescription('Encerra o combate ativo do canal'))
    .addSubcommand(s => s.setName('status').setDescription('Mostra o estado do combate ativo')),

  async execute(interaction, ctx) {
    const sub = interaction.options.getSubcommand();
    const data = ctx.loadGuild(interaction.guild.id);
    const channelId = interaction.channelId;
    const combat = data.activeCombats[channelId];

    if (sub === 'iniciar') {
      if (combat && combat.status === 'active') return interaction.reply({ content: 'JÃ¡ existe um combate ativo neste canal. Encerre-o antes. O mundo nÃ£o gosta de caos desorganizado.', ephemeral: true });
      const nome = interaction.options.getString('nome');
      data.activeCombats[channelId] = { nome, status: 'active', round: 1, currentTurn: 0, participants: [], log: [] };
      ctx.saveGuild(interaction.guild.id, data);
      return interaction.reply(`âš”ï¸ **Combate iniciado: ${nome}**\nUse \`/combate adicionar\` para incluir participantes. *Mais um confronto para eu observar com tÃ©dio.*`);
    }

    if (!combat || combat.status !== 'active') {
      return interaction.reply({ content: 'NÃ£o hÃ¡ combate ativo neste canal. Inicie um com `/combate iniciar`. PatÃ©tico.', ephemeral: true });
    }

    if (sub === 'adicionar') {
      const nome = interaction.options.getString('nome');
      const fichaNome = interaction.options.getString('ficha');
      let hp, maxHp, iniciativa, isNpc = !fichaNome;
      if (fichaNome) {
        const char = data.characters[charKey(interaction.user.id, fichaNome)];
        if (!char) return interaction.reply({ content: 'Ficha nÃ£o encontrada.', ephemeral: true });
        hp = char.hp; maxHp = char.maxHp; iniciativa = char.iniciativa || 0;
      } else {
        hp = interaction.options.getInteger('hp') || 10;
        maxHp = hp;
        iniciativa = 0;
      }
      combat.participants.push({ id: `${nome}-${combat.participants.length}`, nome, hp, maxHp, iniciativa, isNpc, ownerId: interaction.user.id, condicoes: [] });
      ctx.saveGuild(interaction.guild.id, data);
      return interaction.reply(`âœ¦ **${nome}** entrou no combate (HP ${hp}/${maxHp}).`);
    }

    if (sub === 'iniciativa') {
      for (const p of combat.participants) {
        p.iniciativa = ctx.rollD20().result + (p.iniciativa || 0);
      }
      combat.participants.sort((a, b) => b.iniciativa - a.iniciativa);
      combat.currentTurn = 0;
      ctx.saveGuild(interaction.guild.id, data);
      const ordem = combat.participants.map((p, i) => `${i + 1}. ${p.nome} (${p.iniciativa})`).join('\n');
      return interaction.reply(`âš¡ **Ordem de iniciativa:**\n${ordem}\n\n*â€” O mundo: "VocÃªs correm. Eu suspiro."*`);
    }

    if (sub === 'dano') {
      const alvo = interaction.options.getString('alvo');
      const valor = interaction.options.getInteger('valor');
      const p = combat.participants.find(x => x.nome.toLowerCase() === alvo.toLowerCase());
      if (!p) return interaction.reply({ content: `Participante "${alvo}" nÃ£o encontrado.`, ephemeral: true });
      p.hp = Math.max(0, p.hp - valor);
      const died = p.hp === 0;
      ctx.saveGuild(interaction.guild.id, data);
      const comment = ctx.commentOnDamage(died);
      return interaction.reply(`âš”ï¸ **${p.nome}** sofreu ${valor} de dano. HP: ${p.hp}/${p.maxHp}${died ? ' â€” **DERROTADO**' : ''}.\n\n*â€” O mundo: "${comment}"*`);
    }

    if (sub === 'curar') {
      const alvo = interaction.options.getString('alvo');
      const valor = interaction.options.getInteger('valor');
      const p = combat.participants.find(x => x.nome.toLowerCase() === alvo.toLowerCase());
      if (!p) return interaction.reply({ content: `Participante "${alvo}" nÃ£o encontrado.`, ephemeral: true });
      p.hp = Math.min(p.maxHp, p.hp + valor);
      ctx.saveGuild(interaction.guild.id, data);
      const comment = ctx.commentOnHeal();
      return interaction.reply(`ðŸ’š **${p.nome}** recuperou ${valor} de HP. HP: ${p.hp}/${p.maxHp}.\n\n*â€” O mundo: "${comment}"*`);
    }

    if (sub === 'turno') {
      combat.currentTurn = (combat.currentTurn + 1) % combat.participants.length;
      if (combat.currentTurn === 0) combat.round += 1;
      const atual = combat.participants[combat.currentTurn];
      ctx.saveGuild(interaction.guild.id, data);
      return interaction.reply(`âž¡ï¸ **Turno de ${atual.nome}** (Rodada ${combat.round}).`);
    }

    if (sub === 'encerrar') {
      combat.status = 'ended';
      ctx.saveGuild(interaction.guild.id, data);
      delete data.activeCombats[channelId];
      ctx.saveGuild(interaction.guild.id, data);
      return interaction.reply(`âš”ï¸ Combate **${combat.nome}** encerrado. *O mundo recolhe os mortos com indiferenÃ§a.*`);
    }

    if (sub === 'status') {
      if (!combat.participants.length) return interaction.reply('Nenhum participante ainda.');
      const lista = combat.participants.map((p, i) => {
        const marker = i === combat.currentTurn ? 'â–¶ï¸ ' : '   ';
        return `${marker}${p.nome} â€” HP ${p.hp}/${p.maxHp}${p.condicoes.length ? ` Â· ${p.condicoes.join(',')}` : ''}`;
      }).join('\n');
      return interaction.reply(`**${combat.nome}** â€” Rodada ${combat.round}\n\`\`\`\n${lista}\n\`\`\``);
    }
  },
};