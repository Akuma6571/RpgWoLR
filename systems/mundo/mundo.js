class SistemaMundo {

    constructor() {
        this.estado = {
            nome: "O Mundo",
            iniciadoEm: new Date(),
            dia: 1,
            hora: 12,
            clima: "Normal",
            estacao: "Primavera",
            descricao: "",
            eventoAtual: null,
            bloqueado: false
        };
    }

    obter() {
        return this.estado;
    }

    definir(dados = {}) {
        this.estado = {
            ...this.estado,
            ...dados
        };

        return this.estado;
    }

    definirClima(clima) {
        this.estado.clima = clima;
        return this.estado;
    }

    definirEstacao(estacao) {
        this.estado.estacao = estacao;
        return this.estado;
    }

    definirDescricao(descricao) {
        this.estado.descricao = descricao;
        return this.estado;
    }

    definirEvento(evento) {
        this.estado.eventoAtual = evento;
        return this.estado;
    }

    removerEvento() {
        this.estado.eventoAtual = null;
        return this.estado;
    }

    avancarHora(quantidade = 1) {