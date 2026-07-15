class SistemaMemoria {

    constructor() {
        this.memoria = new Map();
    }

    criar(chave, valor = {}) {
        this.memoria.set(chave, {
            atualizadoEm: new Date(),
            ...valor
        });

        return this.memoria.get(chave);
    }

    buscar(chave) {
        return this.memoria.get(chave) || null;
    }

    atualizar(chave, dados = {}) {
        const atual = this.buscar(chave);

        if (!atual) {
            return this.criar(chave, dados);
        }

        const novo = {
            ...atual,
            ...dados,
            atualizadoEm: new Date()
        };

        this.memoria.set(chave, novo);

        return novo;
    }

    existe(chave) {
        return this.memoria.has(chave);
    }

    remover(chave) {
        return this.memoria.delete(chave);
    }

    limpar() {
        this.memoria.clear();
    }

    listar() {
        return [...this.memoria.entries()].map(([chave, valor]) => ({
            chave,
            ...valor
        }));
    }

    adicionarLista(chave, valor) {
        let memoria = this.buscar(chave);

        if (!memoria) {
            memoria = {
                lista: []
            };
        }

        if (!Array.isArray(memoria.lista)) {
            memoria