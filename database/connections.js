const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000
});

pool.on("connect", () => {
    console.log("[DATABASE] Conectado ao PostgreSQL.");
});

pool.on("error", (error) => {
    console.error("[DATABASE] Erro inesperado:", error);
});

async function connect() {
    const client = await pool.connect();

    try {
        await client.query("SELECT NOW()");
        return true;
    } finally {
        client.release();
    }
}

async function query(text, params = []) {
    return pool.query(text, params);
}

async function transaction(callback) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const result = await callback(client);

        await client.query("COMMIT");

        return result;
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}

async function close() {
    await pool.end();
}

module.exports = {
    pool,
    connect,
    query,
    transaction,
    close
};