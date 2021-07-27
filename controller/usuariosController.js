const usuariosModel = require('../model/usuariosModel');
const bcryptjs = require('bcryptjs');

exports.cadastrar = ({ nome, email, senha, confirma }) => {
  if ( senha !== confirma ) {
    throw new Error("As senhas não conferem");
  }  

  const hashed = bcryptjs.hashSync(senha);
  return usuariosModel.novoUsuario({ nome, email, hashed });
};

exports.login = ({ email, senha }) => {
  const usuario = usuariosModel.getUserByEmail(email);

  if (!usuario) {
    throw new Error("Acesso negado: Usuário ou senha inválido");
  }

  if (!bcryptjs.compareSync(senha, usuario.hashed)) {
    throw new Error("Acesso negado: Usuário ou senha inválido");
  }

  const { id, nome } = usuario;

  return { id, nome, email };
};

exports.listarTodos = () => usuariosModel.listarTodos();