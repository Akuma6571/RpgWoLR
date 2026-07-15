const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
});

pool.on("error", (err) => {
    console.error("Erro inesperado no PostgreSQL:", err);
});

async function query(text, params = []) {
    const resultado = await pool.query(text, params);
    return resultado;
}

async function transaction(callback) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const resultado = await callback(client);

        await client.query("COMMIT");

        return resultado;

    } catch (erro) {

        await client.query("ROLLBACK");
        throw erro;

    } finally {

        client.release();

    }
}

async function conectar() {
    const client = await pool.connect();
    client.release();
    console.log("PostgreSQL conectado.");
}

module.exports = {
    pool,
    query,
    transaction,
    conectar
};