// ==========================================
// 🌍 O MUNDO BOT V2
// SISTEMA DEFINITIVO DE EVENTOS
// ==========================================

const database = require("../../database/database");



// ==========================================
// REGISTRAR EVENTO
// ==========================================

async function registrar(tipo, dados = {}){

    return await database.buscarUm(

`
INSERT INTO eventos
(
tipo,
personagem_id,
usuario_id,
servidor_id,
dados
)

VALUES
(
$1,$2,$3,$4,$5
)

RETURNING *
`,

[
    tipo,
    dados.personagem_id || null,
    dados.usuario_id || null,
    dados.servidor || dados.servidor_id || null,
    dados
]

    );

}



// ==========================================
// BUSCAR POR ID
// ==========================================

async function buscar(id){

    return await database.buscarUm(

`
SELECT *

FROM eventos

WHERE id = $1

LIMIT 1
`,

[id]

    );

}



// ==========================================
// BUSCAR POR TIPO
// ==========================================

async function buscarPorTipo(tipo, limite = 100){

    return await database.buscarTodos(

`
SELECT *

FROM eventos

WHERE tipo = $1

ORDER BY criado_em DESC

LIMIT $2
`,

[tipo, limite]

    );

}



// ==========================================
// BUSCAR POR PERSONAGEM
// ==========================================

async function buscarPorPersonagem(personagemId){

    return await database.buscarTodos(

`
SELECT *

FROM eventos

WHERE personagem_id = $1

ORDER BY criado_em DESC
`,

[personagemId]

    );

}



// ==========================================
// BUSCAR POR USUÁRIO
// ==========================================

async function buscarPorUsuario(usuarioId){

    return await database.buscarTodos(

`
SELECT *

FROM eventos

WHERE usuario_id = $1

ORDER BY criado_em DESC
`,

[usuarioId]

    );

}



// ==========================================
// ÚLTIMOS EVENTOS
// ==========================================

async function ultimos(limite = 100){

    return await database.buscarTodos(

`
SELECT *

FROM eventos

ORDER BY criado_em DESC

LIMIT $1
`,

[limite]

    );

}



// ==========================================
// REMOVER EVENTO
// ==========================================

async function remover(id){

    return await database.buscarUm(

`
DELETE FROM eventos

WHERE id = $1

RETURNING *
`,

[id]

    );

}



// ==========================================
// EXPORTAÇÃO
// ==========================================

module.exports = {

    registrar,

    buscar,

    buscarPorTipo,

    buscarPorPersonagem,

    buscarPorUsuario,

    ultimos,

    remover

};