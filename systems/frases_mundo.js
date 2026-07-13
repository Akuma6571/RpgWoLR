const frases = {


vitoria: [

"Interessante... uma criatura que deveria ser o fim de muitos encontrou seu fim pelas mãos de um mortal.",

"O Mundo registrou sua vitória. Poucos conseguem deixar marcas tão cedo.",

"A poeira da batalha ainda não baixou, mas seu nome já começou a ecoar.",

"Mais uma criatura caiu. O equilíbrio do mundo foi levemente alterado."

],





dragao: [

"Um dragão caiu. As eras passam, impérios desaparecem, mas feitos assim permanecem.",

"O Mundo observou em silêncio enquanto uma existência ancestral era derrotada.",

"Poucos conseguem desafiar criaturas que caminharam antes das próprias civilizações.",

"O rugido de um dragão foi substituído pelo silêncio. Esta memória não será esquecida."

],





morte: [

"Sua existência chegou ao fim... mas o Mundo ainda observa o que restará dela.",

"A morte é apenas mais um capítulo registrado pela história."

"Mesmo desaparecendo, suas ações continuam presas às raízes deste mundo.",

"O Mundo viu sua queda. Agora resta descobrir se haverá retorno."

],





evolucao: [

"Algo dentro de você mudou. O Mundo reconhece essa nova existência.",

"A transformação foi registrada. Você não é mais aquele que era antes.",

"Novas possibilidades surgiram, e o Mundo aguarda para ver seus limites.",

"A evolução de uma criatura sempre causa pequenas ondas no destino."

],





magia: [

"O conhecimento arcano encontrou um novo portador.",

"Cada magia aprendida altera levemente o caminho daqueles que a dominam.",

"O Mundo observa aqueles que tentam compreender forças além do comum.",

"Uma nova magia nasceu. Agora ela faz parte da história."

],





magia_proibida: [

"Uma força esquecida voltou a caminhar pelo mundo.",

"Alguns conhecimentos foram perdidos por um motivo. O Mundo observa sua escolha.",

"Há poderes que não deveriam ser encontrados facilmente.",

"O equilíbrio foi levemente perturbado por esse novo conhecimento."

],





descoberta: [

"Um segredo antigo foi revelado. O Mundo guarda poucas verdades.",

"Descobertas mudam aqueles que possuem coragem para procurá-las.",

"Uma nova informação foi adicionada às memórias do mundo.",

"Poucos encontram aquilo que estava escondido."

],





nascimento: [

"Uma nova vida surgiu. Toda existência começa deixando uma pequena marca.",

"O Mundo observa uma nova história começando.",

"Entre incontáveis vidas, uma nova possibilidade nasceu."

],





intervencao: [

"O Mundo raramente interfere. Quando interfere, existe um motivo.",

"As leis foram alteradas por um instante. Algo importante aconteceu.",

"Uma força maior observou e decidiu agir.",

"Quando o Mundo toca uma existência, nada permanece igual."

],





desconhecido: [

"O Mundo observou, mas permaneceu em silêncio.",

"Este acontecimento foi registrado nas profundezas da existência.",

"Algo mudou, mesmo que poucos tenham percebido."

]


};








function escolher(tipo){


const lista = frases[tipo] || frases.desconhecido;


const indice = Math.floor(

Math.random() * lista.length

);


return lista[indice];


}








module.exports = {


escolher


};