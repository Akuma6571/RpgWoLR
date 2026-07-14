-- ==========================================
-- 🌍 O MUNDO BOT V2
-- BANCO DE DADOS PRINCIPAL
-- PostgreSQL
-- ==========================================


-- ==========================================
-- JOGADORES
-- ==========================================

CREATE TABLE jogadores (

    id SERIAL PRIMARY KEY,

    discord_id VARCHAR(30) UNIQUE NOT NULL,

    nome_discord VARCHAR(100),

    canal_ficha VARCHAR(30),

    criado_em TIMESTAMP DEFAULT NOW()

);



-- ==========================================
-- PERSONAGENS
-- ==========================================

CREATE TABLE personagens (

    id SERIAL PRIMARY KEY,

    jogador_id INTEGER REFERENCES jogadores(id)
    ON DELETE CASCADE,

    slot INTEGER NOT NULL,

    nome VARCHAR(100),

    titulo VARCHAR(100),

    idade INTEGER,

    altura INTEGER,

    raca VARCHAR(50),

    classe VARCHAR(50),

    subclasse VARCHAR(50),

    nivel BIGINT DEFAULT 1,

    xp BIGINT DEFAULT 0,

    mensagem_ficha VARCHAR(30),

    canal_ficha VARCHAR(30),

    ativo BOOLEAN DEFAULT TRUE,

    criado_em TIMESTAMP DEFAULT NOW()

);



-- ==========================================
-- ATRIBUTOS
-- ==========================================

CREATE TABLE atributos (

    personagem_id INTEGER PRIMARY KEY
    REFERENCES personagens(id)
    ON DELETE CASCADE,

    vida BIGINT DEFAULT 0,

    resistencia BIGINT DEFAULT 0,

    forca BIGINT DEFAULT 0,

    agilidade BIGINT DEFAULT 0,

    estamina BIGINT DEFAULT 0,

    mana BIGINT DEFAULT 0,

    inteligencia BIGINT DEFAULT 0,

    carisma BIGINT DEFAULT 0,

    aura BIGINT DEFAULT 0,

    sorte BIGINT DEFAULT 0,

    chance_critica BIGINT DEFAULT 0

);



-- ==========================================
-- APTIDÕES
-- ==========================================

CREATE TABLE aptidoes (

    personagem_id INTEGER PRIMARY KEY
    REFERENCES personagens(id)
    ON DELETE CASCADE,

    magica INTEGER DEFAULT 0,

    fogo INTEGER DEFAULT 0,

    terra INTEGER DEFAULT 0,

    ar INTEGER DEFAULT 0,

    agua INTEGER DEFAULT 0,

    luz INTEGER DEFAULT 0,

    escuridao INTEGER DEFAULT 0,

    secundarias INTEGER DEFAULT 0

);



-- ==========================================
-- HABILIDADES
-- ==========================================

CREATE TABLE habilidades (

    id SERIAL PRIMARY KEY,

    personagem_id INTEGER REFERENCES personagens(id)
    ON DELETE CASCADE,

    nome VARCHAR(100) NOT NULL,

    descricao TEXT,

    nivel INTEGER DEFAULT 1

);



-- ==========================================
-- MAGIAS
-- ==========================================

CREATE TABLE magias (

    id SERIAL PRIMARY KEY,

    personagem_id INTEGER REFERENCES personagens(id)
    ON DELETE CASCADE,

    nome VARCHAR(100) NOT NULL,

    descricao TEXT,

    nivel INTEGER DEFAULT 1

);

-- ==========================================
-- MEMÓRIA DO MUNDO
-- ==========================================

CREATE TABLE memorias_mundo (

    id SERIAL PRIMARY KEY,

    jogador_id INTEGER REFERENCES jogadores(id)
    ON DELETE CASCADE,

    personagem_id INTEGER REFERENCES personagens(id)
    ON DELETE CASCADE,

    tipo VARCHAR(50),

    descricao TEXT NOT NULL,

    importancia INTEGER DEFAULT 1,

    criado_em TIMESTAMP DEFAULT NOW()

);



-- ==========================================
-- COMBATES
-- ==========================================

CREATE TABLE combates (

    id SERIAL PRIMARY KEY,

    personagem_id INTEGER REFERENCES personagens(id)
    ON DELETE CASCADE,

    alvo VARCHAR(100) NOT NULL,

    raridade VARCHAR(50),

    resultado VARCHAR(30),

    xp_recebido BIGINT DEFAULT 0,

    criado_em TIMESTAMP DEFAULT NOW()

);



-- ==========================================
-- SISTEMA DE DADOS
-- ==========================================

CREATE TABLE rolamentos (

    id SERIAL PRIMARY KEY,

    jogador_id INTEGER REFERENCES jogadores(id)
    ON DELETE CASCADE,

    dado BIGINT NOT NULL,

    resultado BIGINT NOT NULL,

    criado_em TIMESTAMP DEFAULT NOW()

);



-- ==========================================
-- LOG ADMINISTRATIVO
-- ==========================================

CREATE TABLE logs_admin (

    id SERIAL PRIMARY KEY,

    comando VARCHAR(100),

    descricao TEXT,

    criado_em TIMESTAMP DEFAULT NOW()

);

-- ==========================================
-- EVENTOS DO MUNDO
-- ==========================================

CREATE TABLE eventos (

    id BIGSERIAL PRIMARY KEY,

    tipo VARCHAR(100) NOT NULL,

    personagem_id INTEGER
    REFERENCES personagens(id)
    ON DELETE SET NULL,

    usuario_id VARCHAR(50),

    servidor_id VARCHAR(50),

    dados JSONB NOT NULL,

    criado_em TIMESTAMP DEFAULT NOW()

);



-- ==========================================
-- ÍNDICES
-- ==========================================

CREATE INDEX idx_eventos_tipo
ON eventos(tipo);

CREATE INDEX idx_eventos_personagem
ON eventos(personagem_id);

CREATE INDEX idx_eventos_usuario
ON eventos(usuario_id);

CREATE INDEX idx_eventos_servidor
ON eventos(servidor_id);

CREATE INDEX idx_eventos_data
ON eventos(criado_em DESC);