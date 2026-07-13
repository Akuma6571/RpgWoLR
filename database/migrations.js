const database = require("./database");
const logger = require("../utils/logger");


const migrations = [

{
    version: 1,

    name: "Criar controle de versões",

    sql: `

    CREATE TABLE IF NOT EXISTS schema_version(

        version INTEGER PRIMARY KEY,

        nome TEXT,

        executado_em TIMESTAMP DEFAULT NOW()

    );

    `
},


{
    version: 2,

    name: "Criar usuários",

    sql: `

    CREATE TABLE IF NOT EXISTS usuarios(

        discord_id TEXT PRIMARY KEY,

        criado_em TIMESTAMP DEFAULT NOW()

    );

    `
},


{
    version: 3,

    name: "Criar personagens",

    sql: `

    CREATE TABLE IF NOT EXISTS personagens(

        id SERIAL PRIMARY KEY,

        discord_id TEXT NOT NULL,

        slot INTEGER NOT NULL,


        titulo TEXT DEFAULT 'Sem título',

        nome TEXT DEFAULT 'Sem nome',

        idade INTEGER DEFAULT 0,

        altura INTEGER DEFAULT 0,


        raca TEXT DEFAULT 'Não definida',

        classe TEXT DEFAULT 'Não definida',

        subclasse TEXT DEFAULT 'Nenhuma',


        nivel INTEGER DEFAULT 1,

        xp BIGINT DEFAULT 0,

        xp_proximo BIGINT DEFAULT 25,


        estado TEXT DEFAULT 'vivo',


        mortes INTEGER DEFAULT 0,

        revivido INTEGER DEFAULT 0,


        criado_em TIMESTAMP DEFAULT NOW(),

        atualizado_em TIMESTAMP DEFAULT NOW(),


        UNIQUE(discord_id, slot),


        FOREIGN KEY(discord_id)

        REFERENCES usuarios(discord_id)

        ON DELETE CASCADE

    );

    `
},


{
    version: 4,

    name: "Criar atributos",

    sql: `

    CREATE TABLE IF NOT EXISTS atributos(

        personagem_id INTEGER PRIMARY KEY,


        vida BIGINT DEFAULT 100,

        forca BIGINT DEFAULT 10,

        agilidade BIGINT DEFAULT 10,

        resistencia BIGINT DEFAULT 10,

        estamina BIGINT DEFAULT 10,

        mana BIGINT DEFAULT 10,

        inteligencia BIGINT DEFAULT 10,

        carisma BIGINT DEFAULT 10,

        aura BIGINT DEFAULT 10,

        sorte BIGINT DEFAULT 10,

        chance_critica DECIMAL DEFAULT 5,


        pontos_disponiveis INTEGER DEFAULT 0,


        FOREIGN KEY(personagem_id)

        REFERENCES personagens(id)

        ON DELETE CASCADE

    );

    `
},


{
    version: 5,

    name: "Criar aptidões",

    sql: `

    CREATE TABLE IF NOT EXISTS aptidoes(

        personagem_id INTEGER PRIMARY KEY,


        magica INTEGER DEFAULT 0,

        fogo INTEGER DEFAULT 0,

        terra INTEGER DEFAULT 0,

        ar INTEGER DEFAULT 0,

        agua INTEGER DEFAULT 0,

        luz INTEGER DEFAULT 0,

        escuridao INTEGER DEFAULT 0,

        secundarias INTEGER DEFAULT 0,


        FOREIGN KEY(personagem_id)

        REFERENCES personagens(id)

        ON DELETE CASCADE

    );

    `
},


{
    version: 6,

    name: "Criar habilidades",

    sql: `

    CREATE TABLE IF NOT EXISTS habilidades(

        id SERIAL PRIMARY KEY,

        personagem_id INTEGER,


        nome TEXT,

        descricao TEXT,


        xp BIGINT DEFAULT 0,


        FOREIGN KEY(personagem_id)

        REFERENCES personagens(id)

        ON DELETE CASCADE

    );

    `
},


{
    version: 7,

    name: "Criar magias",

    sql: `

    CREATE TABLE IF NOT EXISTS magias(

        id SERIAL PRIMARY KEY,

        personagem_id INTEGER,


        nome TEXT,

        descricao TEXT,


        xp BIGINT DEFAULT 0,


        FOREIGN KEY(personagem_id)

        REFERENCES personagens(id)

        ON DELETE CASCADE

    );

    `
},


{
    version: 8,

    name: "Criar moedas",

    sql: `

    CREATE TABLE IF NOT EXISTS moedas(

        personagem_id INTEGER PRIMARY KEY,


        cobre BIGINT DEFAULT 0,

        prata BIGINT DEFAULT 0,

        ouro BIGINT DEFAULT 0,

        platina BIGINT DEFAULT 0,


        FOREIGN KEY(personagem_id)

        REFERENCES personagens(id)

        ON DELETE CASCADE

    );

    `
},


{
    version: 9,

    name: "Criar dados do Mundo",

    sql: `

    CREATE TABLE IF NOT EXISTS mundo_personagem(

        personagem_id INTEGER PRIMARY KEY,


        interesse INTEGER DEFAULT 0,


        titulo_oculto TEXT,


        interferencias INTEGER DEFAULT 0,


        afinidade TEXT DEFAULT 'neutro',


        segredo TEXT,


        FOREIGN KEY(personagem_id)

        REFERENCES personagens(id)

        ON DELETE CASCADE

    );

    `
},


{
    version: 10,

    name: "Criar histórico de eventos",

    sql: `

    CREATE TABLE IF NOT EXISTS eventos(

        id SERIAL PRIMARY KEY,


        personagem_id INTEGER,


        tipo TEXT,

        descricao TEXT,


        resultado TEXT,


        xp_recebido BIGINT DEFAULT 0,


        data TIMESTAMP DEFAULT NOW(),


        FOREIGN KEY(personagem_id)

        REFERENCES personagens(id)

        ON DELETE CASCADE

    );

    `
}

];



async function verificarExecutada(version){

    const resultado = await database.buscarUm(

        "SELECT version FROM schema_version WHERE version=$1",

        [version]

    );


    return resultado !== null;

}




async function registrar(migration){


    await database.executar(

        `

        INSERT INTO schema_version

        (version,nome)

        VALUES($1,$2)

        `,

        [

            migration.version,

            migration.name

        ]

    );

}





async function executar(){


    logger.info(

        "🌍 Verificando estrutura do banco..."

    );



    for(const migration of migrations){



        const existe = await verificarExecutada(

            migration.version

        );



        if(existe)

            continue;



        logger.info(

            "Executando: "

            + migration.name

        );



        await database.executar(

            migration.sql

        );



        await registrar(

            migration

        );



        logger.sucesso(

            "Concluído: "

            + migration.name

        );


    }



    logger.sucesso(

        "🌍 Banco preparado."

    );


}





module.exports = {

    executar

};