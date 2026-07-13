// ==========================================
// 🌍 O MUNDO BOT V2
// SISTEMA DEFINITIVO DE BANCO DE DADOS
// PostgreSQL
// ==========================================


const { Pool } = require("pg");
const dotenv = require("dotenv");



dotenv.config();




// ==========================================
// CONFIGURAÇÃO DO POOL
// ==========================================


const pool = new Pool({

    host: process.env.DB_HOST,

    port: process.env.DB_PORT,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_DATABASE,


    max: 20,


    idleTimeoutMillis: 30000,


    connectionTimeoutMillis: 5000


});





// ==========================================
// MONITORAMENTO DA CONEXÃO
// ==========================================


pool.on(

    "connect",

    () => {

        console.log(
            "🌍 Conexão PostgreSQL estabelecida."
        );

    }

);




pool.on(

    "error",

    (erro) => {


        console.error(
            "❌ Erro inesperado no PostgreSQL:"
        );


        console.error(erro);


    }

);







// ==========================================
// EXECUTAR COMANDOS
// INSERT / UPDATE / DELETE
// ==========================================


async function executar(

    query,

    valores = []

){


    const cliente = await pool.connect();


    try{


        const resultado = await cliente.query(

            query,

            valores

        );


        return resultado;



    }finally{


        cliente.release();


    }


}







// ==========================================
// BUSCAR UM REGISTRO
// ==========================================


async function buscarUm(

    query,

    valores = []

){


    const cliente = await pool.connect();


    try{


        const resultado = await cliente.query(

            query,

            valores

        );


        return resultado.rows[0] || null;



    }finally{


        cliente.release();


    }


}








// ==========================================
// BUSCAR VÁRIOS REGISTROS
// ==========================================


async function buscarTodos(

    query,

    valores = []

){


    const cliente = await pool.connect();


    try{


        const resultado = await cliente.query(

            query,

            valores

        );


        return resultado.rows;



    }finally{


        cliente.release();


    }


}








// ==========================================
// TRANSAÇÕES
// Usado para ações importantes
// Ex:
// Dar XP + subir nível + criar memória
// ==========================================


async function transacao(

    comandos

){


    const cliente = await pool.connect();



    try{


        await cliente.query(
            "BEGIN"
        );



        const resultados = [];



        for(const comando of comandos){


            const resultado = await cliente.query(

                comando.query,

                comando.valores || []

            );


            resultados.push(resultado);


        }



        await cliente.query(
            "COMMIT"
        );



        return resultados;



    }catch(erro){


        await cliente.query(
            "ROLLBACK"
        );


        throw erro;



    }finally{


        cliente.release();


    }


}








// ==========================================
// FECHAR BANCO
// Usado quando o bot desligar
// ==========================================


async function fecharBanco(){


    await pool.end();


}








// ==========================================
// EXPORTAÇÃO
// ==========================================


module.exports = {


    executar,


    buscarUm,


    buscarTodos,


    transacao,


    fecharBanco


};