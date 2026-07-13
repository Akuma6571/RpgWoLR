// ==========================================
// 🌍 O MUNDO BOT V2
// EVENTO READY
// ==========================================


module.exports = {


    name: "ready",


    once: true,



    async execute(client){



        console.log(
            "================================"
        );


        console.log(
            "🌍 O Mundo despertou."
        );


        console.log(
            `🤖 Conectado como: ${client.user.tag}`
        );


        console.log(
            `🌐 Servidores observados: ${client.guilds.cache.size}`
        );


        console.log(
            "================================"
        );



    }


};