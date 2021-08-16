const { Usuario } = require('../models');
const bcryptjs = require('bcryptjs');

exports.cadastrar = ({ nome, email, senha, confirma }) => {
  if ( senha !== confirma ) {
    throw new Error("As senhas não conferem");
  }  

  const hashed = bcryptjs.hashSync(senha);

  return usuariosModel.novoUsuario({ nome, email, hashed });
};

exports.listarTodos = async () => {
    const todosUsuarios = await Usuario.findAll();

    return todosUsuarios;
}
