class SistemaEventos {
    constructor() {
        this.eventos = new Map();
    }

    criar(nome, dados = {}) {
        if (this.eventos.has(nome)) {
            return {
                sucesso: false,
                mensagem: "Este evento já existe."
            };
        }

        const evento = {
            nome,
            ativo: false,
            criadoEm: new Date(),
            iniciadoEm: null,
            encerradoEm: null,
            participantes: [],
            ...dados
        };

        this.eventos.set(nome, evento);

        return {
            sucesso: true,
            evento
        };
    }

    iniciar(nome) {
        const evento = this.eventos.get(nome);

        if (!evento) {
            return {
                sucesso: false,
                mensagem: "Evento não encontrado."
            };
        }

        evento.ativo = true;
        evento.iniciadoEm = new Date();

        return {
            sucesso: true,
            evento
        };
    }

    encerrar(nome) {
        const evento = this.eventos.get(nome);

        if (!evento) {
            return {
                sucesso: false,
                mensagem: "Evento não encontrado."
            };
        }

        evento.ativo = false;
        evento.encerradoEm = new Date();

        return {
            sucesso: true,
            evento
        };
    }

    adicionarParticipante(nome, jogadorId) {
        const evento = this.eventos.get(nome);

        if (!evento) {
            return {
                sucesso: false,
                mensagem: "Evento não encontrado."
            };
        }

        if (!evento.participantes.includes(jogadorId)) {
            evento.participantes.push(jogadorId);
        }

        return {
            sucesso: true,
            evento
        };
    }

    removerParticipante(nome, jogadorId) {
        const evento = this.eventos.get(nome);

        if (!evento) {
            return {
                sucesso: false,
                mensagem: "Evento não encontrado."
            };
        }

        evento.participantes = evento.participantes.filter(
            id => id !== jogadorId
        );

        return {
            sucesso: true,
            evento
        };
    }

    buscar(nome) {
        return this.eventos.get(nome) || null;
    }

    listar() {
        return [...this.eventos.values()];
    }

    listarAtivos() {
        return [...this.eventos.values()].filter(evento => evento.ativo);
    }

    excluir(nome) {
        return this.eventos.delete(nome);
    }

    limpar() {
        this.eventos.clear();
    }
}

module.exports = new SistemaEventos();