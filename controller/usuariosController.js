const usuariosModel = require('../model/usuariosModel');
const bcryptjs = require('bcryptjs');

exports.cadastrar = ({ nome, email, senha, confirma }) => {
  if ( senha !== confirma ) {
    throw new Error("As senhas não conferem");
  }  

  const hashed = bcryptjs.hashSync(senha);
  return usuariosModel.novoUsuario({ nome, email, hashed });
};


exports.login = ({email, senha})=> {
  const emailUsuario = usuariosModel.procurarEmail(email);

  if (emailUsuario === undefined){
    throw new Error("Este email não está cadastrado no sistema")
  } 

  if (!bcryptjs.compareSync(senha, usuarios.hashed)){
    throw new Error("A senha está incorreta")
  }

  return emailUsuario;
}

exports.listarTodos = () => usuariosModel.listarTodos(); 