const express = require("express");
const router = express.Router();
const usuariosController = require("../controller/usuariosController");

router.get("/", function (req, res, next) {
  const { session } = req;
  const todosOsUsuariosCadastrados = usuariosController.listarTodos();
  const estouLogadoCorretamente = !!session.userId;
  res.render("index", { title: "Express", session, estouLogadoCorretamente, todosOsUsuariosCadastrados });
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

router.get("/login", function (req,res){
  res.render("login");
});

router.post("/login", function(req,res){
  const {email,senha} = req.body;
  const { id: userId }= usuariosController.validarUsuario(email,senha)
  const { session } = req;
  session.userId = userId;

  res.redirect('/');
})
module.exports = router;
