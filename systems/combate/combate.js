const jogadores = require("../../database/jogadores");

class SistemaCombate {

    async atacar(atacanteId, alvoId, dano) {
        const atacante = await jogadores.buscar(atacanteId);
        const alvo = await jogadores.buscar(alvoId);

        if (!atacante || !alvo) {
            return {
                sucesso: false,
                mensagem: "Jogador não encontrado."
            };
        }

        let vida = alvo.vida - dano;

        if (vida < 0) vida = 0;

        await jogadores.atualizar(alvoId, { vida });

        return {
            sucesso: true,
            atacante,
            alvo,
            dano,
            vidaRestante: vida,
            morreu: vida === 0
        };
    }

    async curar(jogadorId, cura) {
        const jogador = await jogadores.buscar(jogadorId);

        if (!jogador) {
            return {
                sucesso: false,
                mensagem: "Jogador não encontrado."
            };
        }

        let vida = jogador.vida + cura;

        if (vida > jogador.vida_maxima)
            vida = jogador.vida_maxima;

        await jogadores.atualizar(jogadorId, { vida });

        return {
            sucesso: true,
            vida
        };
    }

    async gastarMana(jogadorId, mana) {
        const jogador = await jogadores.buscar(jogadorId);

        if (!jogador) {
            return {
                sucesso: false,
                mensagem: "Jogador não encontrado."
            };
        }

        if (jogador.mana < mana) {
            return {
                sucesso: false,
                mensagem: "Mana insuficiente."
            };
        }

        const restante = jogador.mana - mana;

        await jogadores.atualizar(jogadorId, {
            mana: restante
        });

        return {
            sucesso: true,
            mana: restante
        };
    }

    async recuperarMana(jogadorId, mana) {
        const jogador = await jogadores.buscar(jogadorId);

        if (!jogador) {
            return {
                sucesso: false,
                mensagem: "Jogador não encontrado."
            };
        }

        let restante = jogador.mana + mana;

        if (restante > jogador.mana_maxima)
            restante = jogador.mana_maxima;

        await jogadores.atualizar(jogadorId, {
            mana: restante
        });

        return {
            sucesso: true,
            mana: restante
        };
    }

    async gastarEstamina(jogadorId, estamina) {
        const jogador = await jogadores.buscar(jogadorId);

        if (!jogador) {
            return {
                sucesso: false,
                mensagem: "Jogador não encontrado."
            };
        }

        if (jogador.estamina < estamina) {
            return {
                sucesso: false,
                mensagem: "Estamina insuficiente."
            };
        }

        const restante = jogador.estamina - estamina;

        await jogadores.atualizar(jogadorId, {
            estamina: restante
        });

        return {
            sucesso: true,
            estamina: restante
        };
    }

    async recuperarEstamina(jogadorId, estamina) {
        const jogador = await jogadores.buscar(jogadorId);

        if (!jogador) {
            return {
                sucesso: false,
               