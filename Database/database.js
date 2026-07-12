const { Pool } = require("pg");


// Conexão com o PostgreSQL

const pool = new Pool({

    connectionString: process.env.DATABASE_URL,

    ssl: {
        rejectUnauthorized: false
    }

});


// Teste de conexão

pool.connect()

    .then(client => {

        console.log(
            "🌍 Banco PostgreSQL conectado."
        );

        client.release();


        criarTabela();

    })


    .catch(error => {

        console.error(
            "❌ Erro ao conectar ao PostgreSQL:",
            error
        );

    });




// Criar tabela de jogadores

async function criarTabela() {


    const query = `

    CREATE TABLE IF NOT EXISTS jogadores (

        id TEXT PRIMARY KEY,

        titulo TEXT DEFAULT 'Sem título',

        nome TEXT,

        idade INTEGER DEFAULT 0,

        altura INTEGER DEFAULT 0,


        raca TEXT DEFAULT 'Não definida',

        classe TEXT DEFAULT 'Não definida',

        subclasse TEXT DEFAULT 'Não definida',



        vida INTEGER DEFAULT 100,

        resistencia INTEGER DEFAULT 10,

        forca INTEGER DEFAULT 10,

        agilidade INTEGER DEFAULT 10,

        estamina INTEGER DEFAULT 10,

        mana INTEGER DEFAULT 10,

        inteligencia INTEGER DEFAULT 10,

        carisma INTEGER DEFAULT 10,

        aura INTEGER DEFAULT 10,

        sorte INTEGER DEFAULT 10,

        chancecritica INTEGER DEFAULT 5,



        magica INTEGER DEFAULT 0,

        fogo INTEGER DEFAULT 0,

        terra INTEGER DEFAULT 0,

        ar INTEGER DEFAULT 0,

        agua INTEGER DEFAULT 0,

        luz INTEGER DEFAULT 0,

        escuridao INTEGER DEFAULT 0,

        secundarias INTEGER DEFAULT 0,



        habilidades TEXT DEFAULT 'Nenhuma',

        magias TEXT DEFAULT 'Nenhuma',



        nivel INTEGER DEFAULT 1,

        xp INTEGER DEFAULT 0

    );

    `;


    try {

        await pool.query(query);


        console.log(
            "🌍 Tabela de jogadores pronta."
        );


    } catch(error) {


        console.error(
            "❌ Erro ao criar tabela:",
            error
        );


    }


}



module.exports = pool;