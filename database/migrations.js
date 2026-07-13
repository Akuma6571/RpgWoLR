const pool = require("./database");
const logger = require("../utils/logger");

const migrations = [

{
    version: 1,

    name: "Criar tabela de versões",

    sql: `

    CREATE TABLE IF NOT EXISTS schema_version(

        version INTEGER PRIMARY KEY,

        data_execucao TIMESTAMP DEFAULT NOW()

    );

    `
},

{
    version: 2,

    name: "Criar tabela de usuários",

    sql: `

    CREATE TABLE IF NOT EXISTS usuarios(

        discord_id TEXT PRIMARY KEY,

        criado_em TIMESTAMP DEFAULT NOW()

    );

    `
},

{
    version: 3,

    name: "Criar tabela de personagens",

    sql: `

    CREATE TABLE IF NOT EXISTS personagens(

        id SERIAL PRIMARY KEY,

        discord_id TEXT NOT NULL,

        slot INTEGER NOT NULL,

        ativo BOOLEAN DEFAULT TRUE,

        criado_em TIMESTAMP DEFAULT NOW(),

        atualizado_em TIMESTAMP DEFAULT NOW(),

        FOREIGN KEY(discord_id)

        REFERENCES usuarios(discord_id)

        ON DELETE CASCADE

    );

    `

}

];

async function criarControle(){

    await pool.query(`

        CREATE TABLE IF NOT EXISTS schema_version(

            version INTEGER PRIMARY KEY,

            data_execucao TIMESTAMP DEFAULT NOW()

        );

    `);

}

async function executada(version){

    const resultado = await pool.query(

        `SELECT version FROM schema_version WHERE version=$1`,

        [version]

    );

    return resultado.rows.length > 0;

}

async function registrar(version){

    await pool.query(

        `INSERT INTO schema_version(version)

        VALUES($1)`,

        [version]

    );

}

async function executar(){

    logger.info("Verificando migrações...");

    await criarControle();

    for(const migration of migrations){

        const existe = await executada(

            migration.version

        );

        if(existe){

            continue;

        }

        logger.info(

            `Executando Migration ${migration.version} - ${migration.name}`

        );

        await pool.query(

            migration.sql

        );

        await registrar(

            migration.version

        );

        logger.sucesso(

            `Migration ${migration.version} concluída.`

        );

    }

    logger.sucesso(

        "Banco totalmente atualizado."

    );

}

module.exports = {

    executar

};