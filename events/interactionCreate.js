module.exports = {
    name: "interactionCreate",

    async execute(interaction, client) {

        if (!interaction.isChatInputCommand()) return;

        const comando = client.commands.get(interaction.commandName);

        if (!comando) {
            return interaction.reply({
                content: "❌ Este comando não existe.",
                ephemeral: true
            });
        }

        try {

            await comando.execute(interaction, client);

        } catch (erro) {

            console.error(
                `[ERRO] Comando /${interaction.commandName}:`,
                erro
            );

            const resposta = {
                content: "❌ Ocorreu um erro ao executar este comando.",
                ephemeral: true
            };

            if (interaction.deferred || interaction.replied) {
                await interaction.followUp(resposta).catch(() => {});
            } else {
                await interaction.reply(resposta).catch(() => {});
            }

        }

    }
};