module.exports = {
    name: "ready",
    once: true,

    async execute(client) {

        console.clear();

        console.log("========================================");
        console.log("         O MUNDO - RPG BOT");
        console.log("========================================");
        console.log(`Bot conectado como: ${client.user.tag}`);
        console.log(`ID: ${client.user.id}`);
        console.log(`Servidores: ${client.guilds.cache.size}`);
        console.log(`Usuários: ${client.users.cache.size}`);
        console.log(`Comandos carregados: ${client.commands.size}`);
        console.log(`Inicializado em: ${new Date().toLocaleString("pt-BR")}`);
        console.log("========================================");

        client.user.setPresence({
            status: "online",
            activities: [
                {
                    name: "O Mundo RPG",
                    type: 3
                }
            ]
        });

    }
};