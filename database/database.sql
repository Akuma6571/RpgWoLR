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

    criado_em TIMESTAMP NOT NULL DEFAULT NOW()

);



-- ==========================================
-- PERSONAGENS
-- ==========================================

CREATE TABLE personagens (

    id SERIAL PRIMARY KEY,

    jogador_id INTEGER NOT NULL
    REFERENCES jogadores(id)
    ON DELETE CASCADE,

    slot INTEGER NOT NULL
    CHECK (slot > 0),

    nome VARCHAR(100),

    titulo VARCHAR(100),

    idade INTEGER,

    altura INTEGER,

    raca VARCHAR(50),

    classe VARCHAR(50),

    subclasse VARCHAR(50),

    nivel BIGINT NOT NULL DEFAULT 1
    CHECK (nivel >= 1),

    xp BIGINT NOT NULL DEFAULT 0
    CHECK (xp >= 0),

    mensagem_ficha VARCHAR(30),

    canal_ficha VARCHAR(30),

    ativo BOOLEAN NOT NULL DEFAULT TRUE,

    criado_em TIMESTAMP NOT NULL DEFAULT NOW(),

    UNIQUE (jogador_id, slot)

);



-- ==========================================
-- ATRIBUTOS
-- ==========================================

CREATE TABLE atributos (

    personagem_id INTEGER PRIMARY KEY
    REFERENCES personagens(id)
    ON DELETE CASCADE,

    vida BIGINT NOT NULL DEFAULT 0,

    resistencia BIGINT NOT NULL DEFAULT 0,

    forca BIGINT NOT NULL DEFAULT 0,

    agilidade BIGINT NOT NULL DEFAULT 0,

    estamina BIGINT NOT NULL DEFAULT 0,

    mana BIGINT NOT NULL DEFAULT 0,

    inteligencia BIGINT NOT NULL DEFAULT 0,

    carisma BIGINT NOT NULL DEFAULT 0,

    aura BIGINT NOT NULL DEFAULT 0,

    sorte BIGINT NOT NULL DEFAULT 0,

    chance_critica BIGINT NOT NULL DEFAULT 0

);



-- ==========================================
-- APTIDÕES
-- ==========================================

CREATE TABLE aptidoes (

    personagem_id INTEGER PRIMARY KEY
    REFERENCES personagens(id)
    ON DELETE CASCADE,

    magica INTEGER NOT NULL DEFAULT 0,

    fogo INTEGER NOT NULL DEFAULT 0,

    terra INTEGER NOT NULL DEFAULT 0,

    ar INTEGER NOT NULL DEFAULT 0,

    agua INTEGER NOT NULL DEFAULT 0,

    luz INTEGER NOT NULL DEFAULT 0,

    escuridao INTEGER NOT NULL DEFAULT 0,

    secundarias INTEGER NOT NULL DEFAULT 0

);



-- ==========================================
-- HABILIDADES
-- ==========================================

CREATE TABLE habilidades (

    id SERIAL PRIMARY KEY,

    personagem_id INTEGER NOT NULL
    REFERENCES personagens(id)
    ON DELETE CASCADE,

    nome VARCHAR(100) NOT NULL,

    descricao TEXT,

    nivel INTEGER NOT NULL DEFAULT 1
    CHECK (nivel >= 1),

    UNIQUE (personagem_id, nome)

);



-- ==========================================
-- MAGIAS
-- ==========================================

CREATE TABLE magias (

    id SERIAL PRIMARY KEY,

    personagem_id INTEGER NOT NULL
    REFERENCES personagens(id)
    ON DELETE CASCADE,

    nome VARCHAR(100) NOT NULL,

    descricao TEXT,

    nivel INTEGER NOT NULL DEFAULT 1
    CHECK (nivel >= 1),

    UNIQUE (personagem_id, nome)

);



-- ==========================================
-- MEMÓRIA DO MUNDO
-- ==========================================

CREATE TABLE memorias_mundo (

    id SERIAL PRIMARY KEY,

    jogador_id INTEGER
    REFERENCES jogadores(id)
    ON DELETE CASCADE,

    personagem_id INTEGER
    REFERENCES personagens(id)
    ON DELETE CASCADE,

    tipo VARCHAR(50),

    descricao TEXT NOT NULL,

    importancia INTEGER NOT NULL DEFAULT 1,

    criado_em TIMESTAMP NOT NULL DEFAULT NOW()

);



-- ==========================================
-- COMBATES
-- ==========================================

CREATE TABLE combates (

    id SERIAL PRIMARY KEY,

    personagem_id INTEGER NOT NULL
    REFERENCES personagens(id)
    ON DELETE CASCADE,

    alvo VARCHAR(100) NOT NULL,

    raridade VARCHAR(50),

    resultado VARCHAR(30),

    xp_recebido BIGINT NOT NULL DEFAULT 0
    CHECK (xp_recebido >= 0),

    criado_em TIMESTAMP NOT NULL DEFAULT NOW()

);



-- ==========================================
-- SISTEMA DE DADOS
-- ==========================================

CREATE TABLE rolamentos (

    id SERIAL PRIMARY KEY,

    jogador_id INTEGER NOT NULL
    REFERENCES jogadores(id)
    ON DELETE CASCADE,

    dado BIGINT NOT NULL
    CHECK (dado > 0),

    resultado BIGINT NOT NULL,

    criado_em TIMESTAMP NOT NULL DEFAULT NOW()

);



-- ==========================================
-- LOG ADMINISTRATIVO
-- ==========================================

CREATE TABLE logs_admin (

    id SERIAL PRIMARY KEY,

    comando VARCHAR(100),

    descricao TEXT,

    criado_em TIMESTAMP NOT NULL DEFAULT NOW()

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

    criado_em TIMESTAMP NOT NULL DEFAULT NOW()

);



-- ==========================================
-- ÍNDICES
-- ==========================================

CREATE INDEX idx_personagens_jogador
ON personagens(jogador_id);

CREATE INDEX idx_habilidades_personagem
ON habilidades(personagem_id);

CREATE INDEX idx_magias_personagem
ON magias(personagem_id);

CREATE INDEX idx_memorias_jogador
ON memorias_mundo(jogador_id);

CREATE INDEX idx_memorias_personagem
ON memorias_mundo(personagem_id);

CREATE INDEX idx_combates_personagem
ON combates(personagem_id);

CREATE INDEX idx_rolamentos_jogador
ON rolamentos(jogador_id);

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