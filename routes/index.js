const express = require("express");
const router = express.Router();
const usuariosController = require("../controller/usuariosController");
const loginController = require("../controller/loginController");

router.get("/", function (req, res, next) {
  const { session } = req;
  const todosOsUsuariosCadastrados = usuariosController.listarTodos();

  const estouLogadoCorretamente = !!session.userId;
  res.render("index", { title: "Express", session, estouLogadoCorretamente, todosOsUsuariosCadastrados });
});

router.get("/login", function (req, res, next) {

  res.render("login", { title: "Express"});
});

router.post("/", function (req, res, next) {
  const { nome, email, senha, confirma } = req.body;

  const { id: userId } = usuariosController.cadastrar({
    nome,
    email,
    senha,
    confirma,
  });

  const { session } = req;
  session.userId = userId;

  res.redirect('/');
});

router.use("/logout", function (req, res, next) {
  const { session } = req;
  delete session.userId;

  res.redirect("/");
});

router.post("/login", function(req, res, next){
  const todosOsUsuariosCadastrados = usuariosController.listarTodos();
    console.log(todosOsUsuariosCadastrados);
  const { email, senha } = req.body;
  loginController.efetuarLogin({email,senha});

  res.redirect("/");
});

module.exports = router;
