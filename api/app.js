var Parse = require("parse/node");
require("dotenv").config();

// Utiliza arquivo .env para definir uma senha a ser
// usada na conexão com o banco. Veja o README.md do projeto
// para mais instruções.
async function connect() {
  Parse.initialize(process.env.APP_ID, process.env.JS_KEY);
  Parse.serverURL = "https://parseapi.back4app.com/";
}
connect();

const express = require("express");
const app = express();
const port = 3000;

app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();

// FUNCIONARIO
router.get("/funcionario/:id?", async function (req, res, next) {
  try {
    const funcionario = Parse.Object.extend("Funcionario");
    const query = new Parse.Query(funcionario);

    if (req.params.id) res.json(await query.get(req.params.id));
    else res.json(await query.find());
  } catch (err) {
    console.log(err);
    res.status(400).json({ erro: `${err}` });
  }
});

router.post("/funcionario", async function (req, res, next) {
  try {
    const funcionario = new Parse.Object("Funcionario");
    funcionario.set("nome", req.body.nome);
    funcionario.set("email", req.body.email);
    res.json(await funcionario.save());
  } catch (err) {
    console.log(err);
    res.status(400).json({ erro: `${err.message}` });
  }
});

router.put("/funcionario/:id", async function (req, res, next) {
  try {
    const funcionario = Parse.Object.extend("Funcionario");
    const query = new Parse.Query(funcionario);
    const funcionarioEncontrado = await query.get(req.params.id);

    funcionarioEncontrado.set("nome", req.body.nome);
    funcionarioEncontrado.set("email", req.body.email);
    res.json(await funcionarioEncontrado.save());
  } catch (err) {
    console.log(err);
    res.status(400).json({ erro: `${err.message}` });
  }
});

router.delete("/funcionario/:id", async function (req, res, next) {
  try {
    const funcionario = Parse.Object.extend("Funcionario");
    const query = new Parse.Query(funcionario);
    const funcionarioEncontrado = await query.get(req.params.id);

    res.json(await funcionarioEncontrado.destroy());
  } catch (err) {
    console.log(err);
    res.status(400).json({ erro: `${err.message}` });
  }
});

// PRODUTO
router.get("/produto/:id?", async function (req, res, next) {
  try {
    const produto = Parse.Object.extend("Produto");
    const query = new Parse.Query(produto);

    if (req.params.id) res.json(await query.get(req.params.id));
    else res.json(await query.find());
  } catch (err) {
    console.log(err);
    res.status(400).json({ erro: `${err}` });
  }
});

router.post("/produto", async function (req, res, next) {
  try {
    const produto = new Parse.Object("Produto");
    produto.set("descricao", req.body.descricao);
    produto.set("valor", req.body.valor);
    res.json(await produto.save());
  } catch (err) {
    console.log(err);
    res.status(400).json({ erro: `${err.message}` });
  }
});

router.put("/produto/:id", async function (req, res, next) {
  try {
    const produto = Parse.Object.extend("Produto");
    const query = new Parse.Query(produto);
    const produtoEncontrado = await query.get(req.params.id);

    produtoEncontrado.set("descricao", req.body.descricao);
    produtoEncontrado.set("valor", req.body.valor);
    res.json(await produtoEncontrado.save());
  } catch (err) {
    console.log(err);
    res.status(400).json({ erro: `${err.message}` });
  }
});

router.delete("/produto/:id", async function (req, res, next) {
  try {
    const produto = Parse.Object.extend("Produto");
    const query = new Parse.Query(produto);
    const produtoEncontrado = await query.get(req.params.id);

    res.json(await produtoEncontrado.destroy());
  } catch (err) {
    console.log(err);
    res.status(400).json({ erro: `${err.message}` });
  }
});

app.use("/", router);

app.listen(port);
console.log("Servidor iniciado!");

module.exports = app;
