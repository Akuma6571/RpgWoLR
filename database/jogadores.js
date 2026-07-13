// ==========================================
// 🌍 O MUNDO BOT V2
// SISTEMA DEFINITIVO DE JOGADORES
// CAMADA POSTGRESQL
// ==========================================


const database = require("./database");








// ==========================================
// BUSCAR PERSONAGEM ESPECÍFICO
// ==========================================


async function buscarPersonagem(usuarioId, slot){



    return await database.buscarUm(



`
SELECT *

FROM jogadores

WHERE usuario_id = $1

AND slot = $2

LIMIT 1
`,



    [

        usuarioId,

        slot

    ]



    );



}









// ==========================================
// BUSCAR TODOS OS PERSONAGENS DO JOGADOR
// ==========================================


async function buscarPersonagens(usuarioId){



    return await database.buscarTodos(



`
SELECT *

FROM jogadores

WHERE usuario_id = $1

ORDER BY slot ASC
`,



    [

        usuarioId

    ]



    );



}









// ==========================================
// VERIFICAR SE SLOT EXISTE
// ==========================================


async function existePersonagem(usuarioId, slot){



    const personagem = await buscarPersonagem(



        usuarioId,

        slot



    );








    return !!personagem;



}









// ==========================================
// CRIAR PERSONAGEM
// ==========================================


async function criarPersonagem(dados){



    return await database.buscarUm(



`
INSERT INTO jogadores
(
usuario_id,
slot,
nome,
idade,
altura,
raca,
classe,
subclasse,
nivel,
xp
)

VALUES
(
$1,$2,$3,$4,$5,$6,$7,$8,$9,$10
)

RETURNING *
`,



[


dados.usuario_id,


dados.slot,


dados.nome,


dados.idade,


dados.altura,


dados.raca,


dados.classe,


dados.subclasse || null,


dados.nivel || 1,


dados.xp || 0



]



    );



}
// ==========================================
// ADICIONAR XP
// ==========================================


async function adicionarXP(personagemId, quantidade){



    const personagem = await database.buscarUm(



`
SELECT *

FROM jogadores

WHERE id = $1

LIMIT 1
`,



    [

        personagemId

    ]



    );








    if(!personagem){



        return null;



    }








    let novoXP = personagem.xp + quantidade;



    let novoNivel = personagem.nivel;








    // ======================================
    // SISTEMA DE EVOLUÇÃO
    // ======================================


    let xpNecessario = novoNivel * 100;








    while(novoXP >= xpNecessario){



        novoXP -= xpNecessario;



        novoNivel++;



        xpNecessario = novoNivel * 100;



    }








    return await database.buscarUm(



`
UPDATE jogadores

SET

xp = $1,

nivel = $2

WHERE id = $3

RETURNING *
`,



    [

        novoXP,

        novoNivel,

        personagemId



    ]



    );



}









// ==========================================
// ALTERAR ATRIBUTO
// ==========================================


async function alterarAtributo(personagemId, atributo, valor){



    const atributosPermitidos = [



        "vida",

        "forca",

        "resistencia",

        "agilidade",

        "estamina",

        "mana",

        "inteligencia",

        "carisma",

        "aura",

        "sorte",

        "chancecritica"



    ];








    if(!atributosPermitidos.includes(atributo)){



        throw new Error(

            "Atributo inválido."

        );



    }








    return await database.buscarUm(



`
UPDATE jogadores

SET ${atributo} = $1

WHERE id = $2

RETURNING *
`,



    [

        valor,

        personagemId



    ]



    );



}









// ==========================================
// ATUALIZAR DADOS GERAIS
// ==========================================


async function atualizarPersonagem(personagemId, dados){



    const campos = Object.keys(dados);



    const valores = Object.values(dados);








    if(campos.length === 0){



        return null;



    }








    const atualizacoes = campos.map(



        (campo,index)=>



        `${campo} = $${index + 1}`



    );








    return await database.buscarUm(



`
UPDATE jogadores

SET

${atualizacoes.join(",")}

WHERE id = $${campos.length + 1}

RETURNING *
`,



    [

        ...valores,

        personagemId



    ]



    );



}
// ==========================================
// BUSCAR FICHA COMPLETA
// ==========================================


async function buscarFichaCompleta(usuarioId, slot){



    const personagem = await buscarPersonagem(



        usuarioId,

        slot



    );








    if(!personagem){



        return null;



    }








    return personagem;



}









// ==========================================
// SALVAR MENSAGEM DA FICHA
// ==========================================


async function salvarMensagemFicha(
    personagemId,
    mensagemId,
    canalId
){



    return await database.buscarUm(



`
UPDATE jogadores

SET

mensagem_ficha = $1,

canal_ficha = $2

WHERE id = $3

RETURNING *
`,



    [

        mensagemId,

        canalId,

        personagemId



    ]



    );



}









// ==========================================
// REMOVER PERSONAGEM
// ==========================================


async function removerPersonagem(personagemId){



    return await database.buscarUm(



`
DELETE FROM jogadores

WHERE id = $1

RETURNING *
`,



    [

        personagemId

    ]



    );



}









// ==========================================
// EXPORTAÇÃO
// ==========================================


module.exports = {



    buscarPersonagem,


    buscarPersonagens,


    existePersonagem,


    criarPersonagem,


    adicionarXP,


    alterarAtributo,


    atualizarPersonagem,


    buscarFichaCompleta,


    salvarMensagemFicha,


    removerPersonagem



};