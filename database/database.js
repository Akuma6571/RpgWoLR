const { Pool } = require("pg");
const config = require("../config/config");
const logger = require("../utils/logger");


const pool = new Pool({

    connectionString: config.DATABASE_URL,

    ssl: {
        rejectUnauthorized: false
    },

    max: 10,

    idleTimeoutMillis: 30000,

    connectionTimeoutMillis: 10000

});



pool.on("connect", () => {

    logger.info(
        "🌍 Nova conexão PostgreSQL criada."
    );

});


pool.on("error", (error) => {

    logger.erro(
        "Erro inesperado no PostgreSQL: "
        + error.message
    );

});




async function conectarBanco(){

    try {

        const client = await pool.connect();


        logger.sucesso(
            "🌍 Banco PostgreSQL conectado."
        );


        client.release();


        const migrations = require("./migrations");


        await migrations.executar();


    } catch(error){


        logger.erro(
            "Falha ao iniciar banco: "
            + error.message
        );


        process.exit(1);

    }

}





async function query(text, params){

    try {


        return await pool.query(

            text,

            params

        );


    } catch(error){


        logger.erro(

            "Erro SQL: "
            + error.message

        );


        throw error;

    }

}




async function buscarUm(text, params){

    const resultado = await query(

        text,

        params

    );


    return resultado.rows[0] || null;

}





async function buscarTodos(text, params){

    const resultado = await query(

        text,

        params

    );


    return resultado.rows;

}





async function executar(text, params){

    return await query(

        text,

        params

    );

}





module.exports = {


    pool,


    conectarBanco,


    query,


    buscarUm,


    buscarTodos,


    executar


};