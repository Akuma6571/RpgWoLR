CREATE TABLE IF NOT EXISTS jogadores (
    id BIGINT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL,
    personagem VARCHAR(100) NOT NULL,
    raca VARCHAR(50) NOT NULL,
    classe VARCHAR(50) NOT NULL,

    nivel INTEGER NOT NULL DEFAULT 1,
    xp INTEGER NOT NULL DEFAULT 0,

    vida INTEGER NOT NULL,
    vida_maxima INTEGER NOT NULL,

    mana INTEGER NOT NULL,
    mana_maxima INTEGER NOT NULL,

    estamina INTEGER NOT NULL,
    estamina_maxima INTEGER NOT NULL,

    forca INTEGER NOT NULL DEFAULT 0,
    resistencia INTEGER NOT NULL DEFAULT 0,
    agilidade INTEGER NOT NULL DEFAULT 0,
    inteligencia INTEGER NOT NULL DEFAULT 0,
    carisma INTEGER NOT NULL DEFAULT 0,
    aura INTEGER NOT NULL DEFAULT 0,
    sorte INTEGER NOT NULL DEFAULT 0,
    chance_critica INTEGER NOT NULL DEFAULT 0,

    aptidao_magica INTEGER NOT NULL DEFAULT 0,
    aptidao_fogo INTEGER NOT NULL DEFAULT 0,
    aptidao_terra INTEGER NOT NULL DEFAULT 0,
    aptidao_ar INTEGER NOT NULL DEFAULT 0,
    aptidao_agua INTEGER NOT NULL DEFAULT 0,
    aptidao_luz INTEGER NOT NULL DEFAULT 0,
    aptidao_escuridao INTEGER NOT NULL DEFAULT 0,
    aptidao_secundaria INTEGER NOT NULL DEFAULT 0,

    criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS habilidades (
    id SERIAL PRIMARY KEY,
    jogador_id BIGINT NOT NULL REFERENCES jogadores(id) ON DELETE CASCADE,

    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    custo_mana INTEGER DEFAULT 0,
    custo_estamina INTEGER DEFAULT 0,

    criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS magias (
    id SERIAL PRIMARY KEY,
    jogador_id BIGINT NOT NULL REFERENCES jogadores(id) ON DELETE CASCADE,

    nome VARCHAR(100) NOT NULL,
    elemento VARCHAR(50) NOT NULL,
    descricao TEXT,

    custo_mana INTEGER DEFAULT 0,

    criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_habilidades_jogador
ON habilidades(jogador_id);

CREATE INDEX IF NOT EXISTS idx_magias_jogador
ON magias(jogador_id);