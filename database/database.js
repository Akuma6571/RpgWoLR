const { Pool } = require("pg");



const pool = new Pool({

    connectionString: process.env.DATABASE_URL,

    ssl: {
        rejectUnauthorized: false
    }

});





pool.connect()

.then(client => {


    console.log(
        "🌍 Banco PostgreSQL conectado."
    );


    client.release();


    criarBanco();


})


.catch(error => {


    console.error(

        "❌ Erro ao conectar ao PostgreSQL:",

        error

    );


});









async function criarBanco(){



try{



await criarTabelaJogadores();


await criarTabelaMagias();


await criarTabelaHabilidades();


await criarTabelaMundo();


await criarTabelaMemorias();


await criarTabelaEventos();


await criarTabelaRolagens();


await criarTabelaEvolucoes();


await criarTabelaSlots();





console.log(

"🌍 Banco RPG completamente estruturado."

);





}catch(error){



console.error(

"❌ Erro ao criar estrutura:",

error

);



}



}









async function criarTabelaJogadores(){



const query = `



CREATE TABLE IF NOT EXISTS jogadores (



id TEXT PRIMARY KEY,



usuario_id TEXT,



slot INTEGER DEFAULT 1,



universo TEXT DEFAULT 'Principal',



titulo TEXT DEFAULT 'Sem título',



nome TEXT,



idade INTEGER DEFAULT 0,



altura INTEGER DEFAULT 0,



raca TEXT DEFAULT 'Não definida',



classe TEXT DEFAULT 'Não definida',



subclasse TEXT DEFAULT 'Não definida',





status TEXT DEFAULT 'Vivo',



mortes INTEGER DEFAULT 0,



dias_vividos INTEGER DEFAULT 0,



pontos_atributo INTEGER DEFAULT 0,





vida BIGINT DEFAULT 100,



resistencia BIGINT DEFAULT 10,



forca BIGINT DEFAULT 10,



agilidade BIGINT DEFAULT 10,



estamina BIGINT DEFAULT 10,



mana BIGINT DEFAULT 10,



inteligencia BIGINT DEFAULT 10,



carisma BIGINT DEFAULT 10,



aura BIGINT DEFAULT 10,



sorte BIGINT DEFAULT 10,



chancecritica NUMERIC DEFAULT 5,





magica INTEGER DEFAULT 0,



fogo INTEGER DEFAULT 0,



terra INTEGER DEFAULT 0,



ar INTEGER DEFAULT 0,



agua INTEGER DEFAULT 0,



luz INTEGER DEFAULT 0,



escuridao INTEGER DEFAULT 0,



secundarias INTEGER DEFAULT 0,





nivel BIGINT DEFAULT 1,



xp BIGINT DEFAULT 0,





mensagem_ficha TEXT,



canal_ficha TEXT



);



`;




await pool.query(query);



}









async function criarTabelaMagias(){



const query = `



CREATE TABLE IF NOT EXISTS magias (



id SERIAL PRIMARY KEY,



personagem_id TEXT,



nome TEXT,



descricao TEXT,



xp BIGINT DEFAULT 0,



nivel INTEGER DEFAULT 1



);



`;



await pool.query(query);



}









async function criarTabelaHabilidades(){



const query = `



CREATE TABLE IF NOT EXISTS habilidades (



id SERIAL PRIMARY KEY,



personagem_id TEXT,



nome TEXT,



descricao TEXT,



xp BIGINT DEFAULT 0,



nivel INTEGER DEFAULT 1



);



`;



await pool.query(query);



}