// ==========================================
// 🌍 O MUNDO BOT V2
// CONEXÃO POSTGRESQL
// ==========================================


const { Pool } = require("pg");
const dotenv = require("dotenv");


dotenv.config();



// ==========================================
// CONEXÃO COM BANCO
// ==========================================


const pool = new Pool({

    host: process.env.DB_HOST,

    port: process.env.DB_PORT,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_DATABASE,

});




// ==========================================
// TESTE AUTOMÁTICO
// ==========================================


pool.connect()

.then(client => {


    console.log(
        "🌍 PostgreSQL conectado."
    );


    client.release();


})


.catch(error => {


    console.error(
        "❌ Erro PostgreSQL:"
    );


    console.error(error);


});





// ==========================================
// EXECUTAR
// ==========================================


async function executar(

    comando,

    valores = []

){


    const resultado = await pool.query(

        comando,

        valores

    );


    return resultado;


}





// ==========================================
// BUSCAR UM
// ==========================================


async function buscarUm(

    comando,

    valores = []

){


    const resultado = await pool.query(

        comando,

        valores

    );


    return resultado.rows[0];


}





// ==========================================
// BUSCAR TODOS
// ==========================================


async function buscarTodos(

    comando,

    valores = []

){


    const resultado = await pool.query(

        comando,

        valores

    );


    return resultado.rows;


}





module.exports = {


    executar,

    buscarUm,

    buscarTodos


};