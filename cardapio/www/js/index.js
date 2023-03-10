const itensCardapio = [
    {pizza: "Calabresa", preco: "R$ 25,00", imagem: 'url("https://www.sabornamesa.com.br/media/k2/items/cache/9189082f4804c1ab16e77d2cfe8d09d4_XL.jpg"'},
    {pizza: "Quatro Queijos", preco: "R$ 45,00", imagem: 'url("https://pastapizza.com.br/wp-content/uploads/2017/07/Pizza-Pizzaria-Forno-Forza-Express.jpg")'},
    {pizza: "Frango com Catupiry", preco: "R$ 50,00", imagem: 'url("https://swiftbr.vteximg.com.br/arquivos/ids/174176-768-768/pizza-artesanal-mussarela-swift-618284-1.jpg?v=637545446302470000")'}
];

var itemAtual = 0;
var imagem;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('esquerda').addEventListener('click', esquerda);
    document.getElementById('direita').addEventListener('click', direita);
    imagem = document.getElementById('imagem');
}

function direita() {
    if (itemAtual < itensCardapio.length) {
        itemAtual++;
    } else {
        itemAtual = 0;
    }
    atualizarTela();
}

function esquerda() {
    if (itemAtual > 0) {
        itemAtual--;
    } else {
        itemAtual = itensCardapio.length - 1;
    }
    atualizarTela();
}

function atualizarTela() {
    imagem.style.backgroundImage = itensCardapio[itemAtual].imagem;
}

function exibirMensagem() {
    document.getElementById('texto').innerHTML="Boa noite!";
}
