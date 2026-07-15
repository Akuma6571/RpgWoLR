const jogadores = require("../../database/jogadores");

class SistemaNivel {

    xpNecessario(nivel) {
        return Math.floor(100 * Math.pow(nivel, 1.5));
    }

    async obter(id) {
        const jogador = await jogadores.buscar(id);

        if (!jogador) return null;

        return {
            nivel: jogador.nivel,
            xp: jogador.xp,
            xpNecessario: this.xpNecessario(jogador.nivel)
        };
    }

    async definir(id, nivel) {
        const jogador = await jogadores.buscar(id);

        if (!jogador) {
            return {
                sucesso: false,
                mensagem: "Jogador não encontrado."
            };
        }

        if (nivel < 1) nivel = 1;

        await jogadores.atualizar(id, {
            nivel,
            xp: 0
        });

        return {
            sucesso: true,
            nivel
        };
    }

    async subir(id, quantidade = 1) {
        const jogador = await jogadores.buscar(id);

        if (!jogador) {
            return {
                sucesso: false,
                mensagem: "Jogador não encontrado."
            };
        }

        const nivel = jogador.nivel + quantidade;

        await jogadores.atualizar(id, {
            nivel
        });

        return {
            sucesso: true,
            nivel
        };
    }

    async descer(id, quantidade = 1) {
        const jogador = await jogadores.buscar(id);

        if (!jogador) {
            return {
                sucesso: false,
                mensagem: "Jogador não encontrado."
            };
        }

        let nivel = jogador.nivel - quantidade;

        if (nivel < 1) nivel = 1;

        await jogadores.atualizar(id, {
            nivel
        });

        return {
            sucesso: true,
            nivel
        };
    }

    async resetar(id) {
        const jogador = await jogadores.buscar(id);

        if (!jogador) {
            return {
                sucesso: false,
                mensagem: "Jogador não encontrado."
            };
        }

        await jogadores.atualizar(id, {
            nivel: 1,
            xp: 0
        });

        return {
            sucesso: true,
            nivel: 1,
            xp: 0
        };
    }

}

module.exports = new SistemaNivel();