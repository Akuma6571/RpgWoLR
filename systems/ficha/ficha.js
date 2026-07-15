const jogadores = require("../../database/jogadores");

class SistemaFicha {

    async obter(id) {
        return await jogadores.buscar(id);
    }

    async existe(id) {
        const ficha = await jogadores.buscar(id);
        return ficha !== null;
    }

    async criar(id, dados) {
        const existe = await this.existe(id);

        if (existe) {
            return {
                sucesso: false,
                mensagem: "Este jogador já possui uma ficha."
            };
        }

        await jogadores.criar({
            id,
            ...dados
        });

        return {
            sucesso: true,
            mensagem: "Ficha criada com sucesso."
        };
    }

    async atualizar(id, dados) {
        const existe = await this.existe(id);

        if (!existe) {
            return {
                sucesso: false,
                mensagem: "Ficha não encontrada."
            };
        }

        await jogadores.atualizar(id, dados);

        return {
            sucesso: true,
            mensagem: "Ficha atualizada com sucesso."
        };
    }

    async apagar(id) {
        const existe = await this.existe(id);

        if (!existe) {
            return {
                sucesso: false,
                mensagem: "Ficha não encontrada."
            };
        }

        await jogadores