// ==========================================
// 🌍 O MUNDO BOT V2
// SISTEMA DEFINITIVO DE HABILIDADES
// CAMADA POSTGRESQL
// ==========================================


const database = require("./database");








// ==========================================
// BUSCAR TODAS AS HABILIDADES DO PERSONAGEM
// ==========================================


async function buscarHabilidades(personagemId){



    return await database.buscarTodos(



`
SELECT *

FROM habilidades

WHERE personagem_id = $1

ORDER BY id ASC
`,



    [

        personagemId

    ]



    );



}









// ==========================================
// BUSCAR UMA HABILIDADE ESPECÍFICA
// ==========================================


async function buscarHabilidade(personagemId, nome){



    return await database.buscarUm(



`
SELECT *

FROM habilidades

WHERE personagem_id = $1

AND nome = $2

LIMIT 1
`,



    [

        personagemId,

        nome

    ]



    );



}









// ==========================================
// VERIFICAR EXISTÊNCIA
// ==========================================


async function existeHabilidade(personagemId, nome){



    const habilidade = await buscarHabilidade(



        personagemId,

        nome



    );








    return !!habilidade;



}
// ==========================================
// ADICIONAR HABILIDADE
// ==========================================


async function adicionarHabilidade(dados){



    return await database.buscarUm(



`
INSERT INTO habilidades
(
personagem_id,
nome,
descricao,
nivel
)

VALUES
(
$1,$2,$3,$4
)

RETURNING *
`,



    [

        dados.personagem_id,


        dados.nome,


        dados.descricao || null,


        dados.nivel || 1



    ]



    );



}









// ==========================================
// REMOVER HABILIDADE
// ==========================================


async function removerHabilidade(personagemId, nome){



    return await database.buscarUm(



`
DELETE FROM habilidades

WHERE personagem_id = $1

AND nome = $2

RETURNING *
`,



    [

        personagemId,

        nome



    ]



    );



}









// ==========================================
// ALTERAR NÍVEL DA HABILIDADE
// ==========================================


async function alterarNivelHabilidade(
    habilidadeId,
    nivel
){



    return await database.buscarUm(



`
UPDATE habilidades

SET

nivel = $1

WHERE id = $2

RETURNING *
`,



    [

        nivel,

        habilidadeId



    ]



    );



}









// ==========================================
// ATUALIZAR HABILIDADE COMPLETA
// ==========================================


async function atualizarHabilidade(
    habilidadeId,
    dados
){



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
UPDATE habilidades

SET

${atualizacoes.join(",")}

WHERE id = $${campos.length + 1}

RETURNING *
`,



    [

        ...valores,

        habilidadeId



    ]



    );



}
// ==========================================
// AUMENTAR NÍVEL DA HABILIDADE
// ==========================================


async function aumentarNivelHabilidade(
    habilidadeId
){



    const habilidade = await database.buscarUm(



`
SELECT *

FROM habilidades

WHERE id = $1

LIMIT 1
`,



    [

        habilidadeId

    ]



    );








    if(!habilidade){



        return null;



    }








    return await alterarNivelHabilidade(



        habilidadeId,

        habilidade.nivel + 1



    );



}









// ==========================================
// BUSCAR HABILIDADES POR NÍVEL
// ==========================================


async function buscarHabilidadesPorNivel(
    personagemId,
    nivel
){



    return await database.buscarTodos(



`
SELECT *

FROM habilidades

WHERE personagem_id = $1

AND nivel = $2

ORDER BY id ASC
`,



    [

        personagemId,

        nivel



    ]



    );



}









// ==========================================
// EXPORTAÇÃO
// ==========================================


module.exports = {



    buscarHabilidades,


    buscarHabilidade,


    existeHabilidade,


    adicionarHabilidade,


    removerHabilidade,


    alterarNivelHabilidade,


    aumentarNivelHabilidade,


    atualizarHabilidade,


    buscarHabilidadesPorNivel



};