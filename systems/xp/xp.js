const jogadores = require("../../database/jogadores");

class SistemaXP {

    calcularXPProximoNivel(nivel) {
        return Math.floor(100 * Math.pow(nivel, 1.5));
    }

    async adicionar(id, quantidade) {
        const jogador = await jogadores.buscar(id);

        if (!jogador) {
            return {
                sucesso: false,
                mensagem: "Jogador não encontrado."
            };
        }

        let xp = jogador.xp + quantidade;
        let nivel = jogador.nivel;
        let subiuNivel = false;

        while (xp >= this.calcularXPProximoNivel(nivel)) {
            xp -= this.calcularXPProximoNivel(nivel);
            nivel++;
            subiuNivel = true;
        }

        await jogadores.atualizar(id, {
            xp,
            nivel
        });

        return {
            sucesso: true,
            nivel,
            xp,
            subiuNivel
        };
    }

    async remover(id, quantidade) {
        const jogador = await jogadores.buscar(id);

        if (!jogador) {
            return {
                sucesso: false,
                mensagem: "Jogador não encontrado."
            };
        }

        let xp = jogador.xp - quantidade;

        if (xp < 0) xp = 0;

        await jogadores.atualizar(id, {
            xp
        });

        return {
            sucesso: true,
            xp
        };
    }

    async definir(id, quantidade) {
        const jogador = await jogadores.buscar(id);

        if (!jogador) {
            return {
                sucesso: false,
                mensagem: "Jogador não encontrado."
            };
        }

        await jogadores.atualizar(id, {
            xp: quantidade
        });

        return {
            sucesso: true,
            xp: quantidade
        };
    }

    async consultar(id) {
        const jogador = await jogadores.buscar(id);

        if (!jogador) return null;

        return {
            nivel: jogador.nivel,
            xp: jogador.xp,
            proximoNivel: this.calcularXPProximoNivel(jogador.nivel)
        };
    }

}

module.exports = new SistemaXP();