const express = require("express");
const router = express.Router();
const usuariosController = require("../controller/usuariosController");


router.get("/", function (req, res, next) {
  const { session } = req;
  const todosOsUsuariosCadastrados = usuariosController.listarTodos();
  const estouLogadoCorretamente = !!session.userId;
  res.render("index", { title: "Express ", estouLogadoCorretamente, todosOsUsuariosCadastrados });
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

router.get('/login', function(req, res, next) {
    const { session } = req;
    const todosOsUsuariosCadastrados = usuariosController.listarTodos();
    res.render("login", { title: "Express ", todosOsUsuariosCadastrados });
  
});


router.post("/login", function (req, res, next) {
  const { email, senha } = req.body;
  const { id: userId } = usuariosController.efetuarLogin({ email, senha });
  req.session.userId = userId;
  res.redirect("produtos");
});


router.get('/produtos', function(req, res){
      res.render('produtos');

})

module.exports = router;
