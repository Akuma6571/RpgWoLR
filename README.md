# O mundo — Bot de Discord para RPG

Bot de Discord para um sistema de RPG próprio. O mestre é **O mundo**, uma divindade debochada e irritante que comenta rolagens, combates e interage espontaneamente com os jogadores.

## ✦ Recursos

- **Fichas de personagem** — criar, ver, editar, listar e deletar (com HP, mana, atributos, condições e notas)
- **Rolador de dados** — notação flexível (`d20`, `3d6+2`, `2d10-1`), vantagem/desvantagem, com comentários do mundo
- **Sistema de combate** — iniciar combate por canal, adicionar personagens/NPCs, rolar iniciativa, causar dano/cura, avançar turnos, encerrar
- **Personalidade própria** — O mundo comenta críticos, falhas, dano, cura, morte e interjecta aleatoriamente nas conversas
- **Comandos de admin** — expulsar, banir, silenciar, limpar mensagens, apagar fichas/combates

## ✦ Pré-requisitos

- Node.js 18 ou superior
- Um bot criado em https://discord.com/developers/applications (com token e Client ID)
- O **Message Content Intent** ativado nas configurações do bot (para a personalidade reagir a mensagens)

## ✦ Instalação

```bash
cd discord-bot
npm install
cp .env.example .env
# Edite o .env com seu token, Client ID e (opcional) Guild ID
```

## ✦ Registrando os comandos (slash commands)

```bash
npm run deploy
```

Se você preencheu `GUILD_ID` no `.env`, os comandos registram instantaneamente nesse servidor. Se deixar vazio, registram globalmente (pode demorar até 1h para aparecer).

## ✦ Rodando

```bash
npm start
```

## ✦ Comandos

| Comando | Descrição |
|---|---|
| `/ficha criar` | Cria uma ficha (nome, classe, raça, nível, HP, mana, ataque, defesa, iniciativa) |
| `/ficha ver [nome]` | Mostra uma ficha |
| `/ficha listar` | Lista suas fichas |
| `/ficha editar` | Edita um campo da ficha |
| `/ficha condicao` | Adiciona/remove uma condição |
| `/ficha deletar` | Apaga uma ficha |
| `/rolar <dados>` | Rola dados (ex: `/rolar d20`, `/rolar 3d6+2`) com opções de vantagem/desvantagem |
| `/combate iniciar <nome>` | Inicia um combate no canal |
| `/combate adicionar` | Adiciona participante (NPC ou ficha) |
| `/combate iniciativa` | Rola iniciativa para todos |
| `/combate dano <alvo> <valor>` | Causa dano |
| `/combate curar <alvo> <valor>` | Cura |
| `/combate turno` | Próximo turno |
| `/combate encerrar` | Encerra o combate |
| `/combate status` | Estado do combate |
| `/admin limpar_fichas` | Apaga todas as fichas |
| `/admin limpar_combates` | Encerra todos os combates |
| `/admin expulsar` | Expulsa membro |
| `/admin banir` | Bane membro |
| `/admin silenciar` | Silencia por minutos |
| `/admin limpar_mensagens` | Apaga mensagens recentes |

## ✦ Armazenamento

Os dados (fichas e combates) são salvos em arquivos JSON na pasta `data/`, um arquivo por servidor. Simples e sem dependências externas.

## ✦ Personalidade

O mundo é uma divindade arrogante. Ele raramente elogia, debocha das falhas, recebe acertos críticos com elogio relutante, e interjecta aleatoriamente (~2% das mensagens) ou quando é mencionado. Ajuste as falas em `utils/narrator.js`.