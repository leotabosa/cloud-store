var Parse = require("parse/node");
require("dotenv").config();

// Utiliza arquivo .env para definir uma senha a ser
// usada na conexão com o banco. Veja o README.md do projeto
// para mais instruções.
async function connect() {
  Parse.initialize(process.env.APP_ID, process.env.JS_KEY);
  Parse.serverURL = "https://parseapi.back4app.com/";
}

const express = require("express");
const app = express();
const port = 3000;

app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();

connect();

router.get("/usuario/:id?", async function (req, res, next) {
  try {
    const usuario = Parse.Object.extend("Usuario");
    const query = new Parse.Query(usuario);

    if (req.params.id) res.json(await query.get(req.params.id));
    else res.json(await query.find());
  } catch (err) {
    console.log(err);
    res.status(400).json({ erro: `${err}` });
  }
});

router.post("/usuario", async function (req, res, next) {
  try {
    const usuario = new Parse.Object("Usuario");
    usuario.set("nome", req.body.nome);
    usuario.set("email", req.body.email);
    res.json(await usuario.save());
  } catch (err) {
    console.log(err);
    res.status(400).json({ erro: `${err.message}` });
  }
});

router.put("/usuario/:id", async function (req, res, next) {
  try {
    const usuario = Parse.Object.extend("Usuario");
    const query = new Parse.Query(usuario);
    const usuarioEncontrado = await query.get(req.params.id);

    usuarioEncontrado.set("nome", req.body.nome);
    usuarioEncontrado.set("email", req.body.email);
    res.json(await usuarioEncontrado.save());
  } catch (err) {
    console.log(err);
    res.status(400).json({ erro: `${err.message}` });
  }
});

router.delete("/usuario/:id", async function (req, res, next) {
  try {
    const usuario = Parse.Object.extend("Usuario");
    const query = new Parse.Query(usuario);
    const usuarioEncontrado = await query.get(req.params.id);

    res.json(await usuarioEncontrado.destroy());
  } catch (err) {
    console.log(err);
    res.status(400).json({ erro: `${err.message}` });
  }
});

app.use("/", router);

app.listen(port);
console.log("Servidor iniciado!");

module.exports = app;
