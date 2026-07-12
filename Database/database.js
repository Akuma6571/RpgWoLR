const sqlite3 = require("sqlite3").verbose();
const path = require("path");


const dbPath = path.join(
    __dirname,
    "mundo.sqlite"
);


const db = new sqlite3.Database(
    dbPath,
    (err) => {

        if (err) {

            console.error(
                "❌ Erro ao conectar ao banco:",
                err
            );

            return;

        }


        console.log(
            "🌍 Banco de dados conectado."
        );

    }
);



db.run(`

    CREATE TABLE IF NOT EXISTS jogadores (

        id TEXT PRIMARY KEY,

        titulo TEXT DEFAULT 'Sem título',

        nome TEXT,

        idade INTEGER DEFAULT 0,

        altura INTEGER DEFAULT 0,


        raca TEXT DEFAULT 'Não definida',

        classe TEXT DEFAULT 'Não definida',

        subClasse TEXT DEFAULT 'Não definida',



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

        chanceCritica INTEGER DEFAULT 5,



        magica INTEGER DEFAULT 0,

        fogo INTEGER DEFAULT 0,

        terra INTEGER DEFAULT 0,

        ar INTEGER DEFAULT 0,

        agua INTEGER DEFAULT 0,

        luz INTEGER DEFAULT 0,

        escuridao INTEGER DEFAULT 0,

        secundarias INTEGER DEFAULT 0,



        habilidades TEXT DEFAULT '[]',

        magias TEXT DEFAULT '[]',



        nivel INTEGER DEFAULT 1,

        xp INTEGER DEFAULT 0

    )

`);



module.exports = db;