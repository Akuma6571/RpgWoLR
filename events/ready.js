// ==========================================
// 🌍 O MUNDO BOT V2
// EVENTO READY
// INICIALIZAÇÃO DEFINITIVA
// ==========================================


const database = require("../database/database");





module.exports = {


    name: "ready",


    once: true,



    async execute(client){



        console.log(
            "================================="
        );


        console.log(
            "🌍 O Mundo despertou."
        );


        console.log(
            `🤖 Identidade: ${client.user.tag}`
        );


        console.log(
            `🆔 ID: ${client.user.id}`
        );


        console.log(
            `🌐 Servidor observado: ${client.guilds.cache.size}`
        );



        console.log(
            "👁️ A observação começou."
        );



        console.log(
            "================================="
        );






        // ==========================================
        // TESTE DEFINITIVO DO BANCO
        // ==========================================


        try{


            const banco = await database.buscarUm(

                "SELECT NOW() AS horario"

            );



            console.log(

                "💾 PostgreSQL conectado."

            );



            console.log(

                `⏱️ Banco respondeu: ${banco.horario}`

            );



        }catch(erro){


            console.error(

                "❌ Falha ao acessar PostgreSQL."

            );


            console.error(

                erro

            );


        }







        // ==========================================
        // INFORMAÇÕES DO AMBIENTE
        // ==========================================


        console.log(

            `📚 Comandos carregados: ${client.commands.size}`

        );



        console.log(

            "🧠 Sistemas preparados."

        );



        console.log(

            "🌍 O Mundo está observando tudo."

        );



    }


};