const usuariosModel = require('../model/usuariosModel');
const bcryptjs = require('bcryptjs');

exports.cadastrar = ({ nome, email, senha, confirma }) => {
  if ( senha !== confirma ) {
    throw new Error("As senhas não conferem");
  }  

  const hashed = bcryptjs.hashSync(senha);
  return usuariosModel.novoUsuario({ nome, email, hashed });
};
exports.validar = ({email,senha}) =>{
  if(email!==usuariosModel.email) {
    throw new Error("Usuario não encontrado");
  }  

  if(!bcryptjs.compareSync(senha,usuariosModel.hashed)){
    throw new Error("Senha errada");
  }  
  return usuariosModel.novoUsuario({ nome, email, hashed });
}

exports.validarUsuario =(email,senha)=>usuariosModel.logarUsuario(email,senha);


exports.listarTodos = () => usuariosModel.listarTodos();