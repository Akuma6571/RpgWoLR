const database = require("../database/database");






async function salvarFicha(

personagem_id,

mensagem_id,

canal_id

){



await database.executar(

`

INSERT INTO fichas_discord

(

personagem_id,

mensagem_id,

canal_id

)

VALUES

($1,$2,$3)


ON CONFLICT(personagem_id)

DO UPDATE SET

mensagem_id=$2,

canal_id=$3,

atualizada_em=NOW()

`

,

[

personagem_id,

mensagem_id,

canal_id

]

);



}








async function buscarFicha(

personagem_id

){



return await database.buscarUm(

`

SELECT *

FROM fichas_discord

WHERE personagem_id=$1

`

,

[

personagem_id

]

);



}








async function gerarFicha(

personagem_id

){



const personagem = await database.buscarUm(

`

SELECT *

FROM personagens

WHERE id=$1

`

,

[

personagem_id

]

);





const atributos = await database.buscarUm(

`

SELECT *

FROM atributos

WHERE personagem_id=$1

`

,

[

personagem_id

]

);







if(!personagem)

return "Personagem não encontrado.";








return `

🧾 **Ficha de ${personagem.nome}**


━━━━━━━━━━━━━━


🏷️ Título:

${personagem.titulo}


⚔️ Classe:

${personagem.classe}


🧬 Raça:

${personagem.raca}



⭐ Nível:

${personagem.nivel}


✨ XP:

${personagem.xp}/${personagem.xp_proximo}



❤️ Vida:

${atributos?.vida || 0}


💪 Força:

${atributos?.forca || 0}


⚡ Agilidade:

${atributos?.agilidade || 0}


🔮 Mana:

${atributos?.mana || 0}



━━━━━━━━━━━━━━


🌎 O Mundo observa suas ações.

`;



}








async function atualizarFicha(

client,

personagem_id

){



const ficha = await buscarFicha(

personagem_id

);






if(!ficha)

return;







const canal = await client.channels.fetch(

ficha.canal_id

);







const mensagem = await canal.messages.fetch(

ficha.mensagem_id

);







const texto = await gerarFicha(

personagem_id

);







await mensagem.edit(

texto

);



}








module.exports = {


salvarFicha,


buscarFicha,


gerarFicha,


atualizarFicha


};