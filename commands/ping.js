const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Verifica se o bot está funcionando"),

    async execute(interaction) {
        await interaction.reply("🌍 O mundo está funcionando!");
    },
};