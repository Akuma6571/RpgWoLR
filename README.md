# O Mundo — Bot mínimo de Discord para RPG

O Mundo existe para duas coisas: falar pelo mestre e rolar dados.

## Comandos

### `/falar`

O mestre escreve o texto e O Mundo envia **exatamente o mesmo texto**, sem interpretar, corrigir, resumir, completar ou inventar nada.

O comando exige permissão de administrador no servidor.

### `/rolar`

Aceita expressões como:

- `1d20`
- `2d6`
- `1d100`
- `1d20+5`
- `3d10-2`

A quantidade máxima é 100 dados e o máximo de faces por dado é 100.000.

O Mundo pode fazer comentários ocasionais em resultados extremos. Ele nunca demonstra admiração ou fica impressionado.

## Instalação

Requer Node.js 18 ou superior.

```bash
npm install
npm run deploy
npm start
```

Variáveis necessárias no ambiente:

```text
DISCORD_TOKEN=seu_token
CLIENT_ID=id_da_aplicacao
GUILD_ID=id_do_servidor
```

`GUILD_ID` é opcional. Com ele, os comandos são registrados diretamente no servidor indicado.

**Nunca coloque o token do Discord no GitHub.**
