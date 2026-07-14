// ==========================================
// 🌍 O MUNDO BOT V2
// SISTEMA DEFINITIVO DE MAGIAS
// CAMADA POSTGRESQL
// ==========================================


const database = require("./database");









// ==========================================
// BUSCAR TODAS AS MAGIAS DO PERSONAGEM
// ==========================================


async function buscarMagias(personagemId){



    return await database.buscarTodos(



`
SELECT *

FROM magias

WHERE personagem_id = $1

ORDER BY id ASC
`,



    [

        personagemId

    ]



    );



}









// ==========================================
// BUSCAR UMA MAGIA ESPECÍFICA
// ==========================================


async function buscarMagia(personagemId, nome){



    return await database.buscarUm(



`
SELECT *

FROM magias

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


async function existeMagia(personagemId, nome){



    const magia = await buscarMagia(



        personagemId,

        nome



    );








    return !!magia;



}
// ==========================================
// ADICIONAR MAGIA
// ==========================================


async function adicionarMagia(dados){



    return await database.buscarUm(



`
INSERT INTO magias
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
// REMOVER MAGIA
// ==========================================


async function removerMagia(personagemId, nome){



    return await database.buscarUm(



`
DELETE FROM magias

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
// ALTERAR NÍVEL DA MAGIA
// ==========================================


async function alterarNivelMagia(
    magiaId,
    nivel
){



    return await database.buscarUm(



`
UPDATE magias

SET

nivel = $1

WHERE id = $2

RETURNING *
`,



    [

        nivel,

        magiaId



    ]



    );



}









// ==========================================
// ATUALIZAR MAGIA COMPLETA
// ==========================================


async function atualizarMagia(
    magiaId,
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
UPDATE magias

SET

${atualizacoes.join(",")}

WHERE id = $${campos.length + 1}

RETURNING *
`,



    [

        ...valores,

        magiaId



    ]



    );



}
// ==========================================
// AUMENTAR NÍVEL DA MAGIA
// ==========================================


async function aumentarNivelMagia(
    magiaId
){



    const magia = await database.buscarUm(



`
SELECT *

FROM magias

WHERE id = $1

LIMIT 1
`,



    [

        magiaId

    ]



    );








    if(!magia){



        return null;



    }








    return await alterarNivelMagia(



        magiaId,

        magia.nivel + 1



    );



}









// ==========================================
// BUSCAR MAGIAS POR NÍVEL
// ==========================================


async function buscarMagiasPorNivel(
    personagemId,
    nivel
){



    return await database.buscarTodos(



`
SELECT *

FROM magias

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



    buscarMagias,


    buscarMagia,


    existeMagia,


    adicionarMagia,


    removerMagia,


    alterarNivelMagia,


    aumentarNivelMagia,


    atualizarMagia,


    buscarMagiasPorNivel



};