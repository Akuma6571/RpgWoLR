const database = require("../database/database");
const frases = require("./frases");
const frases = require("./frases_mundo");





const Mundo = {



nome: "O Mundo",



humor: "neutro",



personalidade: {



debochado: 80,



curioso: 90,



orgulhoso: 70,



paciente: 60,



cruel: 40,



compassivo: 30



}



};









function escolher(lista){



if(!lista || lista.length === 0){



return "O Mundo observa em silêncio.";



}



return lista[

Math.floor(Math.random() * lista.length)

];



}









function definirHumor(){



const numero = Math.random();



if(numero < 0.20){



Mundo.humor = "divertido";



}



else if(numero < 0.40){



Mundo.humor = "irritado";



}



else if(numero < 0.55){



Mundo.humor = "curioso";



}



else if(numero < 0.70){



Mundo.humor = "impressionado";



}



else{



Mundo.humor = "neutro";



}



return Mundo.humor;



}









async function buscarRelacao(personagemId){



return await database.buscarUm(



`

SELECT *

FROM mundo_personagem

WHERE personagem_id=$1



`,


[

personagemId

]


);



}









function analisarRelacao(relacao){



if(!relacao){



return "desconhecido";



}






if(relacao.respeito >= 80){



return "respeitado";



}





if(relacao.irritacao >= 80){



return "irritante";



}





if(relacao.diversao >= 80){



return "divertido";



}





if(relacao.curiosidade >= 80){



return "interessante";



}





return "normal";



}









async function comentarEvento(

personagemId,

evento,

dados={}

){



const relacao = await buscarRelacao(

personagemId

);





const sentimento = analisarRelacao(

relacao

);





const humor = definirHumor();







let lista;



switch(evento){



case "vitoria":



lista = frases.vitoria;

break;



case "derrota":



lista = frases.derrota;

break;



case "morte":



lista = frases.morte;

break;



case "sorte":



lista = frases.sorte;

break;



case "azar":



lista = frases.azar;

break;



case "chefe":



lista = frases.chefe_derrotado;

break;



case "entidade":



lista = frases.entidade_derrotada;

break;



default:



lista = frases.vitoria;



}







let resposta = escolher(lista);








if(sentimento === "respeitado"){



resposta =

"Interessante... devo admitir que você chamou minha atenção. " +

resposta;



}








if(sentimento === "irritante"){



resposta =

"Você realmente insiste em testar meus limites. " +

resposta;



}








if(humor === "divertido"){



resposta +=

" Confesso que isso foi divertido de observar.";



}








if(humor === "impressionado"){



resposta +=

" Raramente algo consegue me surpreender.";



}







return resposta;



}







async function registrarMemoria(

personagemId,

tipo,

descricao,

importancia = 1

){



try{



await database.executar(

`

INSERT INTO memorias_mundo

(

personagem_id,

tipo,

descricao,

importancia

)

VALUES

(

$1,

$2,

$3,

$4

)

`,

[

personagemId,

tipo,

descricao,

importancia

]

);



}catch(error){



console.error(

"Erro ao registrar memória do Mundo:",

error.message

);



}



}









async function obterMemorias(

personagemId

){



try{



return await database.buscarTodos(

`

SELECT *

FROM memorias_mundo

WHERE personagem_id=$1

ORDER BY importancia DESC



`,

[

personagemId

]

);



}catch(error){



console.error(

"Erro ao buscar memórias:",

error.message

);



return [];



}



}









async function alterarRelacao(

personagemId,

campo,

valor

){



const camposPermitidos = [



"interesse",

"respeito",

"irritacao",

"curiosidade",

"diversao",

"interferencias"



];







if(!camposPermitidos.includes(campo)){



return;



}







try{



await database.executar(

`

UPDATE mundo_personagem

SET ${campo} = ${campo} + $1

WHERE personagem_id=$2



`,

[

valor,

personagemId

]

);



}catch(error){



console.error(

"Erro ao alterar relação do Mundo:",

error.message

);



}



}









async function criarRelacao(

personagemId

){



try{



await database.executar(

`

INSERT INTO mundo_personagem

(

personagem_id

)

VALUES

(

$1

)

ON CONFLICT DO NOTHING



`,

[

personagemId

]

);



}catch(error){



console.error(

"Erro ao criar relação:",

error.message

);



}



}









async function registrarFeito(

personagemId,

feito,

importancia

){



await registrarMemoria(

personagemId,

"feito",

feito,

importancia

);







await alterarRelacao(

personagemId,

"interesse",

Math.floor(importancia / 2)

);







if(importancia >= 80){



await alterarRelacao(

personagemId,

"respeito",

10

);



}



}









async function lembrarAlgo(

personagemId

){



const memorias = await obterMemorias(

personagemId

);





if(memorias.length === 0){



return null;



}





return memorias[0];



}






async function tentarInterferir(

personagemId,

tipo

){



const relacao = await buscarRelacao(

personagemId

);





if(!relacao){



return false;



}







let chance = 0;






if(tipo === "ajuda"){



chance = (

relacao.interesse +

relacao.respeito

) / 300;



}







if(tipo === "punicao"){



chance = (

relacao.irritacao

) / 150;



}







if(chance > 0.80){



chance = 0.80;



}







return Math.random() < chance;



}









async function ajudarJogador(

personagemId

){



await alterarRelacao(

personagemId,

"interferencias",

1

);







const frasesAjuda = [



"Eu não deveria fazer isso... mas admito que fiquei curioso.",



"Considere isso um presente. Não espere que aconteça novamente.",



"Vou alterar apenas uma pequena coisa. Ninguém precisa saber.",



"Você teve sorte. Ou talvez eu tenha decidido que teria."



];






return escolher(

frasesAjuda

);



}









async function punirJogador(

personagemId

){



await alterarRelacao(

personagemId,

"irritacao",

5

);







const frasesPunicao = [



"Você queria testar o destino? Então observe o resultado.",



"Talvez uma pequena dificuldade torne isso mais interessante.",



"Não gosto de interferir... mas você tornou isso necessário."



];







return escolher(

frasesPunicao

);



}









async function mentir(){



const mentiras = [



"Essa informação não existe.",



"Eu não sei. Curioso, não é?",



"Talvez exista uma resposta... talvez não.",



"Você realmente acha que eu revelaria isso?",



"Eu poderia contar a verdade, mas perderia a graça."



];







return escolher(

mentiras

);



}









async function esconderInformacao(

informacao

){



const respostas = [



"Algumas verdades precisam permanecer escondidas.",



"Descobrir isso faz parte da sua jornada.",



"Se eu entregasse tudo, qual seria o sentido da aventura?",



"Essa resposta pertence ao futuro."



];






return escolher(

respostas

);



}









async function comandoMestre(

personagemId,

acao

){



switch(acao){



case "favorecer":



await alterarRelacao(

personagemId,

"respeito",

5

);



return "O Mundo decidiu observar com mais interesse.";



case "irritar":



await alterarRelacao(

personagemId,

"irritacao",

10

);



return "O Mundo perdeu um pouco da paciência.";



case "observar":



const relacao = await buscarRelacao(

personagemId

);



return relacao;



default:



return "O Mundo permanece em silêncio.";



}



}









Mundo.registrarMemoria = registrarMemoria;

Mundo.obterMemorias = obterMemorias;

Mundo.alterarRelacao = alterarRelacao;

Mundo.criarRelacao = criarRelacao;

Mundo.registrarFeito = registrarFeito;

Mundo.lembrarAlgo = lembrarAlgo;

Mundo.tentarInterferir = tentarInterferir;

Mundo.ajudarJogador = ajudarJogador;

Mundo.punirJogador = punirJogador;

Mundo.mentir = mentir;

Mundo.esconderInformacao = esconderInformacao;

Mundo.comandoMestre = comandoMestre;


module.exports = Mundo;