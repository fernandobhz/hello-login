const bcryptjs = require('bcryptjs');
const usuarios = require('../database/usuarios.json')
const fs = require('fs');
exports.novoUsuario = ({ nome, email, hashed }) => {
  const id = usuarios.length + 1;

  const usuario = {
    id,
    nome,
    email,
    hashed,
  };

  usuarios.push(usuario);
  fs.writeFileSync("./database/usuarios.json", JSON.stringify(usuarios));
    return usuario;
};


exports.listarTodos = () => usuarios;

exports.logarUsuario = (email,senha)=>{
    const encontrarUsuario = usuarios.find((usuario) => usuario.email === email);
    if(!encontrarUsuario){
        throw new Error("email inexistente");
      }else{
        if(!bcryptjs.compareSync(senha,encontrarUsuario.hashed)){
            throw new Error("senha invalida");
          }
    }
    return encontrarUsuario;
}
console.log(exports.listarTodos = (email) => usuarios)

