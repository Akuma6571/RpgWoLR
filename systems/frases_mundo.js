const frases = {



vitoria: [


"Interessante... você conseguiu. Não esperava muito, mas admito que foi menos entediante do que imaginei.",

"Mais uma vitória registrada. Não se anime demais, pequenos sucessos costumam criar grandes arrogâncias.",

"Você venceu. Eu poderia dizer que estou impressionado... mas não vou mentir para você.",

"Observei sua batalha inteira. Foi aceitável.",

"Finalmente uma decisão que não terminou em desastre. Estou quase orgulhoso.",

"Você derrotou seu inimigo. Aproveite esse momento, ele pode não voltar tão cedo."

],





derrota: [


"Que decepcionante. Eu esperava mais alguns segundos de entretenimento.",

"Você tinha tantas possibilidades... e escolheu exatamente a pior delas.",

"Interessante. Sua derrota foi quase tão impressionante quanto sua confiança antes dela.",

"Eu poderia ter interferido. Poderia. Mas onde estaria a diversão?",

"Mais uma alma aprendendo que coragem sem capacidade é apenas imprudência."

],





morte: [


"A morte chegou. Ela sempre chega. Alguns apenas demoram mais para perceber.",

"Seu corpo caiu, mas a história ainda não terminou... talvez.",

"Mais uma vida apagada. O mundo continua girando normalmente.",

"Eu avisei? Não. Mas eu poderia ter avisado.",

"Curioso... tantas escolhas e você escolheu justamente essa."

],





azar: [


"Um resultado terrível. Até o destino parece ter desistido de você.",

"Eu vi muitos fracassos, mas esse conseguiu chamar minha atenção.",

"Talvez hoje não seja seu dia. Ou talvez nunca tenha sido.",

"Você conseguiu transformar uma situação simples em uma tragédia. Impressionante."

],





sorte: [


"Um resultado perfeito? Interessante. Não se acostume.",

"O destino resolveu sorrir para você. Aproveite enquanto ele ainda lembra seu nome.",

"Eu admito... isso foi inesperado.",

"Você teve sorte. Não confunda isso com habilidade."

],





morte_humilhante: [


"Essa morte será lembrada. Não por ser grandiosa, mas pelo motivo contrário.",

"Poucos conseguem transformar uma vitória simples em uma vergonha histórica.",

"Eu poderia registrar isso como uma batalha... mas seria uma ofensa às batalhas."

],





chefe_derrotado: [


"Agora sim. Algo digno de ser observado.",

"Uma criatura que muitos temiam encontrou seu fim.",

"Interessante... fazia tempo que algo poderoso caía diante de um mortal.",

"O mundo acabou de perder uma ameaça. Ou talvez tenha criado uma maior."

],





entidade_derrotada: [


"Isso é raro. Muito raro.",

"Poucas existências conseguem chegar a esse ponto.",

"Você acabou de alterar uma pequena parte da história."

],





dragao: [


"Interessante... uma criatura que carregava eras de existência encontrou seu fim pelas mãos de um mortal.",

"Dragões não costumam cair. Quando caem, o mundo costuma lembrar.",

"Você derrotou algo que muitos consideravam eterno. Não confunda isso com ser invencível.",

"Uma era terminou hoje. A pergunta é: o que nascerá no lugar dela?"

],





magia: [


"A mana respondeu ao seu chamado. Poucos conseguem convencer o mundo a obedecer.",

"Você tocou uma força que muitos estudam durante uma vida inteira.",

"A magia não é uma ferramenta. É uma responsabilidade que muitos esquecem.",

"Interessante... você aprendeu a alterar uma pequena parte da realidade."

],





magia_proibida: [


"Você abriu uma porta que muitos passaram eras tentando selar.",

"Alguns conhecimentos existem por uma razão: serem esquecidos.",

"O poder respondeu. Mas algo também respondeu ao poder.",

"Você descobriu uma verdade que talvez nunca devesse ter encontrado."

],





evolucao: [


"Interessante... sua existência acaba de ultrapassar um limite anterior.",

"O ser que você era deixou de existir. Agora resta descobrir o que nasceu em seu lugar.",

"Evolução é apenas outra palavra para uma mudança que não pode ser desfeita.",

"Poucos conseguem alcançar esse ponto. Menos ainda conseguem suportar."

],





nascimento: [


"Uma nova existência surgiu. Pequena agora... mas o futuro raramente é previsível.",

"Mais uma vida entrou no ciclo. O que ela fará ainda permanece desconhecido.",

"Todo grande acontecimento começa com algo aparentemente insignificante."

],





descoberta: [


"Você encontrou algo que muitos passaram suas vidas procurando.",

"O desconhecido deixou de ser desconhecido. Mas novas perguntas surgiram.",

"Conhecimento é uma arma perigosa nas mãos erradas."

],





doma: [


"Curioso... uma criatura que deveria ser selvagem agora escolheu seguir outro caminho.",

"Dominar uma criatura é fácil. Ser aceito por ela é outra questão.",

"Nem toda fera aceita correntes. Algumas aceitam apenas respeito.",

"Uma nova ligação foi criada. Resta saber quanto ela irá durar."

],





subjugacao: [


"A força obrigou a criatura a obedecer. Mas obediência não significa lealdade.",

"Você conquistou o controle, mas não necessariamente conquistou a vontade dela.",

"Algumas correntes são feitas de metal. Outras são feitas de medo.",

"O tempo revelará se essa criatura é uma aliada ou apenas uma prisioneira."

],





intervencao: [


"Eu poderia permanecer em silêncio. Mas algumas situações exigem minha atenção.",

"Uma pequena alteração foi necessária. Não confunda isso com misericórdia.",

"O destino possui caminhos demais para deixar todos seguirem sem interferência.",

"Observe com cuidado. Minha intervenção sempre possui um motivo."

],





deus: [


"Até mesmo aqueles chamados de divindades podem ser observados.",

"Poder não define uma existência. As escolhas feitas com esse poder definem.",

"Alguns seres foram adorados por eras. Isso não significa que sejam eternos.",

"Entre mortais e deuses existe apenas uma diferença: o tempo que levaram para chegar lá."

]

};






frases.escolher = function(categoria){


const lista = frases[categoria];



if(!lista || lista.length === 0){


return "O Mundo permanece em silêncio.";


}



const indice = Math.floor(

Math.random() * lista.length

);



return lista[indice];


};






module.exports = frases;