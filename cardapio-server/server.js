const { MongoClient } = require('mongodb');
var express=require('express');
var app=express();
var cors = require('cors')
var bodyParser = require('body-parser');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())
app.set('view engine', 'pug')
app.use(bodyParser.json({limit: '50mb'}));

const uri = "mongodb+srv://teste:teste@cluster0.wnbdk2i.mongodb.net?retryWrites=true&w=majority";

// --------- EXEMPLO ARMAZENAMENTO IMAGENS --------- 

async function getImagens() {
    const client = new MongoClient(uri);
    try {
      const imagem = client.db('imagem');
      const fotos = imagem.collection('fotos');
      var cursor = await fotos.find();
      return await cursor.toArray();
    } catch(e){
      console.log(e);
    } finally {
      await client.close();
    }
}

async function criarImagem(imagem) {
  const client = new MongoClient(uri);
  try {
      const imagem = client.db('imagem');
      const fotos = imagem.collection('fotos');
      await fotos.insertOne({imagem: imagem});
  } catch (err) {
    console.log(err);
    return err;
  } finally {
      await client.close();
    }
    return "OK";
  }

// --------- APP PEDIDO PIZZA --------- 

// Cria uma lista inicial de pizzas hard coded
async function criarPizzas() {

  const client = new MongoClient(uri);

  try {
      const pizzaria = client.db('pizzaria_app_pedido_pizza');
      const cardapio = pizzaria.collection('pizzas');
      await cardapio.insertOne({pizza: "Calabresa", preco: "R$ 25,00", imagem: 'url("https://www.sabornamesa.com.br/media/k2/items/cache/9189082f4804c1ab16e77d2cfe8d09d4_XL.jpg"'});
      await cardapio.insertOne({pizza: "Quatro Queijos", preco: "R$ 45,00", imagem: 'url("https://pastapizza.com.br/wp-content/uploads/2017/07/Pizza-Pizzaria-Forno-Forza-Express.jpg")'});
      await cardapio.insertOne({pizza: "Frango com Catupiry", preco: "R$ 50,00", imagem: 'url("https://swiftbr.vteximg.com.br/arquivos/ids/174176-768-768/pizza-artesanal-mussarela-swift-618284-1.jpg?v=637545446302470000")'});
    } finally {
      await client.close();
    }
    console.log('OK');
}

async function criarPedido(pizza, quantidade, endereco) {

  const client = new MongoClient(uri);
  let pedido;

try {
    const database = client.db('pizzaria_app_pedido_pizza');
    const pedidos = database.collection('pedidos');
    pedido = await pedidos.insertOne({pizza: pizza, quantidade: quantidade, endereco: endereco});
  } finally {
    await client.close();
  }

  return pedido;
}

async function getPedidos() {
  const client = new MongoClient(uri);
try {
  const database = client.db('pizzaria_app_pedido_pizza');
  const pedidos = database.collection('pedidos');
  var cursor = pedidos.find();
  return await cursor.toArray();
} catch(e){
  console.log(e);
} finally {
  await client.close();
}
}

async function getPizzas() {
  const client = new MongoClient(uri);
try {
  const database = client.db('pizzaria_app_pedido_pizza');
  const pizzas = database.collection('pizzas');
  var cursor = pizzas.find();
  return await cursor.toArray();
} catch(e){
  console.log(e);
} finally {
  await client.close();
}
}

// --------- APP ADM PIZZARIA --------- 

async function criarPizza(idpizzaria, pizza, preco, imagem) {

  const client = new MongoClient(uri);

  try {
      const pizzaria = client.db('pizzaria_app_adm_pizzaria');
      const novaPizza = pizzaria.collection('pizza');
      await novaPizza.insertOne({pizzaria: idpizzaria, pizza: pizza, preco: preco, imagem: imagem});
  } catch (err) {
    console.log(err);
    return err;
  }finally {
      await client.close();
    }
    console.log('OK');
    return "OK";
  }

  async function apagarPizza(idpizzaria, pizza) {

    const client = new MongoClient(uri);
  
    try {
        const pizzaria = client.db('pizzaria_app_adm_pizzaria');
        const novaPizza = pizzaria.collection('pizza');
        await novaPizza.deleteOne({pizzaria: idpizzaria, pizza: pizza});
    } catch (err) {
      console.log(err);
      return err;
    }finally {
        await client.close();
      }
      console.log('OK');
      return "OK";
}

async function getPizzasPizzaria(idpizzaria) {
  const client = new MongoClient(uri);
try {
  const pizzaria = client.db('pizzaria_app_adm_pizzaria');
  const pizza = pizzaria.collection('pizza');
  var cursor = pizza.find({pizzaria: idpizzaria});
  return await cursor.toArray();
} catch(e){
  console.log(e);
} finally {
  await client.close();
}
}

// --------- ENDPOINTS EXEMPLO ARMAZENAMENTO IMAGENS --------- 

app.get('/imagem', async (req, res) => {

  let ret = await getImagens();
  res.render('imagens', {
    imagens: ret
  });

})

app.post('/imagem', async (req, res) => {

  let ret = await criarImagem();
  res.send(ret);

})

// --------- ENDPOINTS APP PEDIDO PIZZA --------- 

// Cria um cardápio inicial com dados hard coded
app.get('/criarpizzas', async (req, res) => {
  await criarPizzas();
  res.send('OK');
})

// Retorna o cardápio com as pizzas
app.get('/pizzas', async (req, res) => {
  res.send(await getPizzas());
})

// Cria um pedido de pizza
app.post('/', async (req, res) => {
    console.log(req.body);
    const pedido = await criarPedido(req.body.pizza, req.body.quantidade, req.body.endereco);
    res.send(pedido);
})

// Exibe uma página web com os pedidos realizados
app.get('/', async (req, res) => {
  let ret = await getPedidos();
  res.render('index', {
  pedidos: ret
});(res);
})

// Retorna os pedidos no formato json
app.get('/json', async (req, res) => {
  res.send(await getPedidos());
})

// --------- ENDPOINTS APP ADM PIZZARIA --------- 

// Apaga a pizza

app.delete('/admin/pizza/:pizzariaid/:pizza', async (req, res) => {
  
  const pizzaria = req.params.pizzariaid;
  const pizza = req.params.pizza;

  if (!pizzaria || pizzaria === "") {
    res.status(400);
    res.send({erro: "Nome da pizzaria é obrigatório!"});

  }
  if (!pizza || pizza === "") {
    res.status(400);
    res.send({erro: "Nome da pizza é obrigatório!"});

  }

  const ret = await apagarPizza(pizzaria, pizza);
  res.send(ret);
})

// Atualiza a pizza
app.put('/admin/pizza', async (req, res, next) => {

next();

})

// Cria uma nova pizza para a pizzaria
app.post('/admin/pizza', async (req, res) => {

  const pizzaria = req.body.pizzaria;
  const pizza = req.body.pizza;
  const preco = req.body.preco;
  const imagem = req.body.imagem;

  if (!pizzaria || pizzaria === "") {
    res.status(400);
    res.send({erro: "Nome da pizzaria é obrigatório!"});

  }
  if (!pizza || pizza === "") {
    res.status(400);
    res.send({erro: "Nome da pizza é obrigatório!"});

  }
  if (!preco || preco === "") {
    res.status(400);
    res.send({erro: "Preço da pizza é obrigatório!"});

  }
  if (!imagem || imagem === "") {
    res.status(400);
    res.send({erro: "Imagem da pizza é obrigatório!"});

  }
  const ret = await criarPizza(pizzaria, pizza, preco, imagem);
  res.send(ret);
})

// Obtém todas as pizzas da pizzaria
app.get("/admin/pizzas/:pizzariaid", async (req, res) => {
  const pizzaria = req.params.pizzariaid;

  if (!pizzaria || pizzaria === "") {
    res.status(400);
    res.send({erro: "Nome da pizzaria é obrigatório!"});

  }
  res.send(await getPizzasPizzaria(pizzaria));
})

// --------- ENDPOINT HEALTH CHECK --------- 

app.get('/ping', async (req, res) => {
  res.send("PONG!");
})

app.listen(
    { port: process.env.PORT | 3000, host: "0.0.0.0" },
    function (err, address) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Your app is listening on ${process.env.PORT | 3000}`);
    }
  );
