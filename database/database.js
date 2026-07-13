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

await criarTabelaLimites();

await inserirLimites();



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

async function criarTabelaMundo(){



const query = `



CREATE TABLE IF NOT EXISTS mundo_personagem (



personagem_id TEXT PRIMARY KEY,



interesse INTEGER DEFAULT 0,



respeito INTEGER DEFAULT 0,



irritacao INTEGER DEFAULT 0,



curiosidade INTEGER DEFAULT 0,



diversao INTEGER DEFAULT 0,



interferencias INTEGER DEFAULT 0,



afinidade TEXT DEFAULT 'neutro',



segredo TEXT



);



`;



await pool.query(query);



}









async function criarTabelaMemorias(){



const query = `



CREATE TABLE IF NOT EXISTS memorias_mundo (



id SERIAL PRIMARY KEY,



personagem_id TEXT,



tipo TEXT,



descricao TEXT,



importancia INTEGER DEFAULT 1,



data_evento TIMESTAMP DEFAULT CURRENT_TIMESTAMP



);



`;



await pool.query(query);



}









async function criarTabelaEventos(){



const query = `



CREATE TABLE IF NOT EXISTS eventos (



id SERIAL PRIMARY KEY,



personagem_id TEXT,



tipo TEXT,



alvo TEXT,



descricao TEXT,



resultado TEXT,



xp_recebido BIGINT DEFAULT 0,



data TIMESTAMP DEFAULT CURRENT_TIMESTAMP



);



`;



await pool.query(query);



}









async function criarTabelaRolagens(){



const query = `



CREATE TABLE IF NOT EXISTS rolagens (



id SERIAL PRIMARY KEY,



personagem_id TEXT,



tipo TEXT,



resultado INTEGER,



modificador INTEGER DEFAULT 0,



motivo TEXT,



data TIMESTAMP DEFAULT CURRENT_TIMESTAMP



);



`;



await pool.query(query);



}









async function criarTabelaEvolucoes(){



const query = `



CREATE TABLE IF NOT EXISTS evolucoes_raca (



id SERIAL PRIMARY KEY,



personagem_id TEXT,



raca_anterior TEXT,



raca_nova TEXT,



motivo TEXT,



data TIMESTAMP DEFAULT CURRENT_TIMESTAMP



);



`;



await pool.query(query);



}









async function criarTabelaSlots(){



const query = `



CREATE TABLE IF NOT EXISTS jogadores_slots (



id SERIAL PRIMARY KEY,



usuario_id TEXT,



slot INTEGER,



personagem_id TEXT



);



`;



await pool.query(query);



}

async function criarTabelaLimites(){


const query = `


CREATE TABLE IF NOT EXISTS limites_atributos (


id SERIAL PRIMARY KEY,


vida BIGINT DEFAULT 1000000000000,


forca BIGINT DEFAULT 950000000000,


agilidade BIGINT DEFAULT 800000000000,


estamina BIGINT DEFAULT 1000000000000,


mana BIGINT DEFAULT 1000000000000,


inteligencia BIGINT DEFAULT 1500000000,


carisma BIGINT DEFAULT 1000000,


aura BIGINT DEFAULT 500000000000,


sorte BIGINT DEFAULT 1000,


chancecritica NUMERIC DEFAULT 150


);


`;



await pool.query(query);



}









async function executar(query, valores=[]){



return await pool.query(

query,

valores

);



}









async function buscarUm(query, valores=[]){



const resultado = await pool.query(

query,

valores

);



return resultado.rows[0];



}









async function buscarTodos(query, valores=[]){



const resultado = await pool.query(

query,

valores

);



return resultado.rows;



}









async function inserirLimites(){



const existe = await buscarUm(

`

SELECT *

FROM limites_atributos

LIMIT 1

`

);



if(!existe){



await executar(

`

INSERT INTO limites_atributos

DEFAULT VALUES

`

);



}



}









module.exports = {


pool,


executar,


buscarUm,


buscarTodos



};