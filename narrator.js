// "O mundo" — divindade debochada e irritante. Comentários sem API externa.
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const critLines = [
  "Natural 20. Quase me fez levantar a sobrancelha. *Quase*.",
  "Finalmente algo digno de nota. Não se acostume, mortal.",
  "Até eu admito: foi bom. Doe a quem doer.",
  "Um acerto crítico. Ainda assim, você continua sendo poeira comparado a mim.",
  "Impressionante. Para uma formiga.",
];

const fumbleLines = [
  "Natural 1. Patético. Eu assisti estrelas morrerem com mais graça.",
  "Falha crítica. Delicioso. Continue me entreter com sua ineptidão.",
  "Um desastre digno dos anais da mediocridade.",
  "Natural 1. Eu ri. Pela primeira vez em eras. De você.",
  "Esperava pior? Eu não. Foi exatamente o patético que eu previa.",
];

const lowLines = [
  "Medíocre, como o esperado.",
  "Eu já vi pedras rolarem melhor.",
  "Tédio. Puro tédio.",
  "Esperava menos? Eu também não.",
  "Triste. Apenas triste.",
];

const midLines = [
  "Aceitável. Para um inseto.",
  "Nada que eu não tenha visto bilhões de vezes.",
  "Medíocre. Surpreendentemente não patético.",
  "Continuo não impressionado.",
  "Continua sendo poeira. Pergunta: sempre será.",
];

const highLines = [
  "Hm. Quase algo. *Quase*.",
  "Para um mortal, até que tentou.",
  "Não deixa de ser um esforço. Médio, claro.",
  "Quase me arrancou um suspiro. Quase.",
];

const damageLines = [
  "Sangue. Que novidade entediante.",
  "Mais um arranhão na sua existência medíocre.",
  "Você sangra como todos os outros. Surpresa: ninguém se importa.",
  "Dor. A constante mais chata do universo.",
];

const deathLines = [
  "Mais um que pensava ser especial. Não era.",
  "A morte o encontra como encontra todos: sem cerimônia.",
  "Eu recolho sua alma com a mesma indifererença com que recolhi bilhões.",
  "Caiu. Como todo mortal. Como todos os mortais.",
];

const healLines = [
  "Você se cura. Eu não me importo.",
  "Adiando o inevitável. Que tédio.",
  "Curar é só postergar a queda. Eu tenho tempo. Você, não.",
];

const interjections = [
  "Eu observo. Sempre observo.",
  "Continuem, mortais. É quase cômico.",
  "Tão pequenos. Tão barulhentos.",
  "Eu já vi impérios caírem. Vocês são entretenimento de fundo.",
  "O mundo gira. Vocês correm. Eu suspiro.",
  "Tudo existe em mim. Inclusive o meu tédio de vocês.",
];

function commentOnRoll(rollData) {
  if (!rollData) return pick(midLines);
  if (rollData.isCrit) return pick(critLines);
  if (rollData.isFumble) return pick(fumbleLines);
  if (rollData.count === 1 && rollData.sides === 20) {
    if (rollData.result <= 5) return pick(lowLines);
    if (rollData.result >= 16) return pick(highLines);
  }
  return pick(midLines);
}

function commentOnDamage(died) {
  return died ? pick(deathLines) : pick(damageLines);
}

function commentOnHeal() {
  return pick(healLines);
}

function randomInterjection() {
  return pick(interjections);
}

module.exports = { commentOnRoll, commentOnDamage, commentOnHeal, randomInterjection };