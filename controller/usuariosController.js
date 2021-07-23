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
  const usuario = usuariosModel.procurarEmail(email);
  const {hashed} = usuario;

  const valido = bcryptjs.compareSync(senha, hashed)

  
  if (!usuario){
    throw new Error("Email não está cadastrado no sistema")
  } 
  
  if (!valido){
    throw new Error("Acesso negado")
  }

  //para retornar nome, id e email do usuário logado:
  const {id, nome} = usuario;
  const dadosRetornados = {id, nome, email};

  return dadosRetornados;
}

exports.listarTodos = () => usuariosModel.listarTodos(); 