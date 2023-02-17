
const { MongoClient } = require('mongodb');
var express=require('express');
var app=express();
var cors = require('cors')

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())
app.set('view engine', 'pug')

const uri = "mongodb+srv://teste:teste@cluster0.wnbdk2i.mongodb.net?retryWrites=true&w=majority";

async function getAll() {
    const client = await new MongoClient(uri);
  try {
    const database = client.db('pizzaria');
    const collection = database.collection('pedidos');
    var cursor = await collection.find();
    return await cursor.toArray();
  } catch(e){
    console.log(e);
  } finally {
    await client.close();
  }
}

async function insert(pizza, quantidade, endereco) {

    const client = await new MongoClient(uri);

  try {
      const database = client.db('pizzaria');
      const movies = database.collection('pedidos');
      const movie = await movies.insertOne({pizza: pizza, quantidade: quantidade, endereco: endereco});
      console.log(movie);
    } finally {
      await client.close();
    }
  }

app.post('/', (req, res) => {

    console.log(req.body);
    insert(req.body.pizza, req.body.quantidade, req.body.endereco);
    res.send("ok");
})

async function getAllRequest(res) {

    let ret = await getAll();
    res.render('index', {
		pedidos: ret
	});

}

async function getAllJSON(res) {

    let ret = await getAll();
    res.send(ret);

}


app.get('/', (req, res) => {
    getAllRequest(res);
})

app.get('/json', (req, res) => {
    getAllJSON(res);
})

app.listen(
    { port: process.env.PORT | 3000, host: "0.0.0.0" },
    function (err, address) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Your app is listening on ${address}`);
    }
  );

