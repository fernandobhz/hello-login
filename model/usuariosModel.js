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

exports.getUserByEmail = (email) => usuarios.find(usuario => usuario.email === email);

exports.listarTodos = () => usuarios;