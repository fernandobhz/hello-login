const usuarios = [];
exports.novoUsuario = ({ nome, email, hashed }) => {
  const id = usuarios.length + 1;

  const usuario = {
    id,
    nome,
    email,
    hashed,
  };

  usuarios.push(usuario);

  return usuario;
};

exports.procurarEmail = (email) => {
  const emailEncontrado = usuarios.find((usuario) => email === usuario.email);
  console.log(emailEncontrado);
  return emailEncontrado;
};

console.log(usuarios);
exports.listarTodos = () => usuarios;