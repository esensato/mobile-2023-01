# mobile-2023-01

### Softwares Básicos

- [Nodejs](https://nodejs.org/en/download/)

- [VS Code](https://code.visualstudio.com/download)

- [Android Studio](https://developer.android.com/studio)

- [Gradle](https://gradle.org/releases/)

- Incluir o Gradle no `PATH`

    - Windows: set PATH=%PATH%;Diretório bin do gradle
    - Linux (Mac): export PATH=$PATH:Diretório bin do gradle
- Exemplo (Windows)
![gradle-1](img/gradle-1.png)
- `set PATH=%PATH%;C:\Software\gradle-7.6.1\bin`
![gradle-2](img/gradle-2.png)

### Correção Versão do Java

- Efetuar o download do [Java 11](https://download.java.net/java/ga/jdk11/openjdk-11_windows-x64_bin.zip)
- Descompactar o arquivo zip em alguma pasta:
![java-1](img/java-1.png)
- Alterar o `JAVA_HOME` apontando para o diretório acima:

    - `SET JAVA_HOME="C:\Software\jdk-11"`

- Verificar a versão da JVM executando `gradle -v`
![java-2](img/java-2.png)

### Instalação Cordova

`npm install -g cordova `

`cordova -v`

### Criando um Projeto

`cordova create cardapio pizzaria.cardapio CardapioApp`

- create: cria um projeto Cordova;
- cardapio: pasta onde o projeto será criado
- pizzaria.cardapio: pacote onde o código será gerado
- CardapioApp: nome do app

### Adicionando Plataformas

Acessar o diretório em que o projeto foi criado

`cordova platform add android`

- Opções: IOS, windows, browser...

### Executando

`cordova run android`

### Eventos

- **Atenção!** Não remover a tag `<div id="deviceready">`

- Criar um botão:

    `<button id = "msg">Clique Aqui</button>`

- Editar o arquivo `index.js`
```
document.getElementById("msg").addEventListener("click", exibirMensagem); 

let exibirMensagem = () => {
    alert('Olá');
}
```
- Exibir a mensagem dentro de um `<div>` incluir no `index.html`
```
<div class="app">
    <h1>Cardápio</h1>
    <div id="deviceready">
        <button id = "msg">Clique Aqui</button>
    </div>
    <div id="conteudo"></div>
</div>
```
- Alterar a função dentro de `index.js`
```
let exibirMensagem = () => {
    document.getElementById("conteudo").innerHTML = 'Olá';
}
```

#### Entrada de Dados

`<div id="form"><input type="text" id="texto"></div>`

```
let exibirMensagem = () => {
    let txt = document.getElementById("texto").value;
    document.getElementById("conteudo").innerHTML = txt;
}
```

- Obs: para manter o posicionamento da interface ao abrir o teclado, ajustar o arquivo `AndroidManifest.xml` e incluir a propriedade `android:windowSoftInputMode="adjustPan"` na tag `<activity>`

### Estilos

- Estilos podem ser editados na pasta `css`, por exemplo, o `index.css`

```
.app {
    display: flex;
    flex-direction: column;
    width:100%
}
```

### Sistema de Pedidos de Pizza

- Criar um app para efetuar o pedido de pizza

#### Interface

- Titulo

```
<div class="titulo">Pizzaria Cordova</div>

.titulo {
    font-size:24px;
    font-weight: bold;
    margin:0px;
    padding-top:10px;
    padding-bottom:10px;
    text-align:center;
    width: 100%;
}
```

- Imagem da Pizza

```
<div class="imagem-container">
    <div class="imagem-lateral"><div class="seta" id="esquerda">&lt;&lt;</div></div>
    <div class="imagem" id="imagem"></div>
    <div class="imagem-lateral"><div class="seta" id="direita">&gt;&gt;</div></div></div>    
</div>

.imagem-container {
    display: flex;
    align-items: center;
}

.imagem-lateral {
    flex: 1;
}

.imagem {
    flex: 3;
    border: solid;
    height: 200px;
}

.seta {
    font-size: 34px;
    text-align: center;
}
```

- Exibindo as imagens

```
background-image: url("../img/pizza.jpg");
background-color: #cccccc;
background-repeat: no-repeat;
background-position: center;
background-size: cover;
```

### Imagens Externas

- Alterar em `index.html` a diretiva de segurança `img-src`:

```
<meta http-equiv="Content-Security-Policy" 
content="default-src 'self' data: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src * data: content:;">
```

- Formulário do Pedido

```
<div class="form-linha">
    <div class="form-linha-esq">Local:</div>
    <div class="form-linha-dir"><input type="text" id="endereco"></div>
</div>

<div class="form-linha">
    <div class="form-linha-esq">Pizza:</div>
    <div class="form-linha-dir" id="pizza">Calabresa com Cebola</div>
</div>

<div class="form-linha">
    <div class="form-linha-esq">Preço:</div>
    <div class="form-linha-dir" id="preco">R$ 35,00</div>
</div>

<div class="form-linha">
    <div class="form-linha-esq">Qtde:</div>
    <div class="form-linha-dir"><select id="qtde"><option value="1">1</option></select></div>
</div>

.form-linha {
    display: flex;
    align-items: center;
    margin-top: 10%;
    margin-left: 5%;
    margin-right: 5%;
}

.form-linha-esq {
    flex: 1;
}

.form-linha-dir {
    flex: 5;
}
```

- Botão Enviar

```
<div class="form-linha">
    <button class="enviar" id="enviar">Enviar</button>
</div>

.enviar {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
}
```

#### Lógica do Negócio

- Criação das variáveis para referenciar os elementos da interface

```
const itensCardapio = [{pizza: "Calabresa", preco: "R$ 25,00", imagem: "../img/pizza.jpg"},
{pizza: "Quatro Queijos", preco: "R$ 35,00", imagem: "../img/pizza.jpg"}];

var idItem = 0;
var endereco;
var qtde;
var preco;
var imagem;
var pizza;
```

- Referenciar os elementos da interface

```
endereco = document.getElementById('endereco');
qtde = document.getElementById('qtde');
preco = document.getElementById('preco');
imagem = document.getElementById('imagem');
pizza = document.getElementById('pizza');
```

- Criar uma função para atualizar a interface e chamá-la no `onDeviceReady`

```
const atualizarInterface = () => {
    pizza.innerHTML = itensCardapio[idItem].pizza;
    preco.innerHTML = itensCardapio[idItem].preco;
    imagem.style.backgroundImage = itensCardapio[idItem].imagem;
}
```

- Mover para a direita

```
const direita = () => {
    if (idItem < itensCardapio.length) {
        idItem++;
    }
    atualizarInterface();
}
```

- Mover para a esquerda

```
const esquerda = () => {
    if (idItem > 0) {
        idItem--;
    }
    atualizarInterface();
}
```

- Enviar dados

```
const enviar = () => {
    alert (endereco.value + " - " + itensCardapio[idItem].pizza + " - " + qtde.value); 
}
```

#### Requisições HTTP

- Instalar o plugin `cordova plugin add cordova-plugin-advanced-http`

- Executando **GET**

```
const request = () => {
    cordova.plugin.http.get('https://pedidos-pizzaria.glitch.me/json', {
}, {}, function(response) {
  console.log(response.data);
}, function(response) {
  console.error(response.error);
});

}
```
- Executando **POST**
```
cordova.plugin.http.post('https://pedidos-pizzaria.glitch.me/', {
  pizza: "Atum com Queijo", quantidade: 1, endereco: "Rua das Rosas, 123"
}, {}, function(response) {
  console.log(response.status);
}, function(response) {
  console.error(response.error);
});
```
#### Splash Screen

- Instalar o plugin:

`cordova plugin add cordova-plugin-splashscreen`

- Configurar a imagem no arquivo `config.xml`

```
<platform name="android">
    <splash src="res/screen/android/pizza.png"/>
    <preference name = "SplashScreenDelay" value = "3000" />
</platform>
```

#### Câmera

- Instalar o plugin:

`cordova plugin add cordova-plugin-camera`

- Incluir um botão para acionar a câmera e o local para exibir a imagem

```
<button id = "cameraTakePicture">Tirar Foto</button>
<img id = "myImage"></img>
```

- Registrar o evento de `click` no botão que vai acionar a câmera

```
document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture); 
```

- Definir a função para efetuar a captura da imagem

```
function cameraTakePicture() { 
    navigator.camera.getPicture(onSuccess, onFail, {  
       quality: 50, 
       destinationType: Camera.DestinationType.DATA_URL 
    });  
    
    function onSuccess(imageData) { 
       var image = document.getElementById('myImage'); 
       image.src = "data:image/jpeg;base64," + imageData; 
    }  
    
    function onFail(message) { 
       alert('Failed because: ' + message); 
    } 
 }
```