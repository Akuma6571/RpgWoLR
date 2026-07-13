const data = () => {

    return new Date().toLocaleString("pt-BR");

};

function info(texto){

    console.log(`[INFO ${data()}] ${texto}`);

}

function aviso(texto){

    console.log(`[AVISO ${data()}] ${texto}`);

}

function erro(texto){

    console.error(`[ERRO ${data()}] ${texto}`);

}

function sucesso(texto){

    console.log(`[SUCESSO ${data()}] ${texto}`);

}

module.exports = {

    info,

    aviso,

    erro,

    sucesso

};