const { SlashCommandBuilder } = require("discord.js");

const XP = require("../systems/xp");
const Mundo = require("../systems/mundo");
const database = require("../database/database");



const DONO_ID = process.env.DONO_ID;





module.exports = {



data: new SlashCommandBuilder()

.setName("matar")

.setDescription(
"Registra uma morte no mundo."
)





.addIntegerOption(option =>

option

.setName("personagem")

.setDescription(
"ID do personagem responsável."
)

.setRequired(true)

)





.addStringOption(option =>

option

.setName("alvo")

.setDescription(
"Nome do alvo morto."
)

.setRequired(true)

)





.addStringOption(option =>

option

.setName("tipo_alvo")

.setDescription(
"Tipo do alvo."
)

.setRequired(true)

.addChoices(

{
name:"Monstro",
value:"monstro"
},

{
name:"Humano",
value:"humano"
},

{
name:"Jogador",
value:"jogador"
},

{
name:"Criatura",
value:"criatura"
},

{
name:"Deus",
value:"deus"
},

{
name:"Entidade",
value:"entidade"
}

)

)





.addIntegerOption(option =>

option

.setName("nivel_alvo")

.setDescription(
"Nível aproximado do alvo."
)

.setRequired(true)

)





.addStringOption(option =>

option

.setName("raridade")

.setDescription(
"Raridade do alvo."
)

.setRequired(true)

.addChoices(

{
name:"Comum",
value:"comum"
},

{
name:"Incomum",
value:"incomum"
},

{
name:"Raro",
value:"raro"
},

{
name:"Épico",
value:"epico"
},

{
name:"Lendário",
value:"lendario"
},

{
name:"Chefe",
value:"chefe"
},

{
name:"Entidade",
value:"entidade"
}

)

)





.addStringOption(option =>

option

.setName("forma_morte")

.setDescription(
"Como o alvo morreu."
)

.setRequired(true)

)





.addStringOption(option =>

option

.setName("local")

.setDescription(
"Onde aconteceu."
)

.setRequired(false)

)





.addStringOption(option =>

option

.setName("descricao")

.setDescription(
"Descrição adicional."
)

.setRequired(false)

),







async execute(interaction){



if(

interaction.user.id !== DONO_ID

){


return interaction.reply({

content:

"❌ Apenas o mestre pode usar esse comando.",

ephemeral:true

});


}






const personagem =

interaction.options.getInteger(
"personagem"
);



const alvo =

interaction.options.getString(
"alvo"
);



const tipo =

interaction.options.getString(
"tipo_alvo"
);



const nivel =

interaction.options.getInteger(
"nivel_alvo"
);



const raridade =

interaction.options.getString(
"raridade"
);



const forma =

interaction.options.getString(
"forma_morte"
);



const local =

interaction.options.getString(
"local"
)

|| "desconhecido";




const descricao =

interaction.options.getString(
"descricao"
)

|| "Nenhuma descrição.";







const multiplicadores = {



comum:1,


incomum:2,


raro:5,


epico:10,


lendario:25,


chefe:50,


entidade:100


};







const multiplicador =

multiplicadores[raridade]

|| 1;







const xpRecebido = Math.floor(

nivel *

50 *

multiplicador

);








await XP.adicionarXP(

personagem,

xpRecebido

);







await database.executar(

`

UPDATE estatisticas_combate

SET

combates = combates + 1,

mortes_causadas = mortes_causadas + 1

WHERE personagem_id=$1

`,

[

personagem

]

);








await database.executar(

`

INSERT INTO eventos

(

personagem_id,

tipo,

descricao,

resultado,

xp_recebido

)

VALUES($1,$2,$3,$4,$5)

`,

[

personagem,

"morte",

`${alvo} foi morto: ${forma}`,

"vitória",

xpRecebido

]

);







await Mundo.registrarMemoria(

personagem,

"morte_causada",

`

Alvo: ${alvo}

Tipo: ${tipo}

Forma: ${forma}

Local: ${local}

Descrição: ${descricao}

`,

5

);







let comentario = await Mundo.comentarEvento(

personagem,

"vitoria"

);








return interaction.reply(

`

☠️ **Morte registrada**

━━━━━━━━━━━━━━

⚔️ Personagem:

${personagem}


💀 Alvo:

${alvo}


🧬 Tipo:

${tipo}


⭐ Nível do alvo:

${nivel}


🏆 Raridade:

${raridade}


🩸 Forma da morte:

${forma}


📍 Local:

${local}


📜 Descrição:

${descricao}


⭐ XP recebido:

${xpRecebido}


━━━━━━━━━━━━━━

🌍 **O Mundo diz:**

"${comentario}"

`

);



}



};