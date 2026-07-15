const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Verifica a latência do bot."),

    async execute(interaction, client) {

        const inicio = Date.now();

        await interaction.reply({
            content: "🏓 Calculando..."
        });

        const fim = Date.now();

        const pingBot = fim - inicio;
        const pingAPI = Math.round(client.ws.ping);

        await interaction.editReply({
            content:
`🏓 **Pong!**

**Latência do Bot:** ${pingBot} ms
**Latência da API:** ${pingAPI} ms`
        });

    }
};