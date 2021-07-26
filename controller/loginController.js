const usuariosModel = require('../model/usuariosModel');
const bcrypt = require('bcryptjs');



exports.efetuarLogin = ({email, senha}) => {
    const usuarioValido = usuariosModel.procurarEmail(email);

    if (!usuarioValido) {
        return res.status(404).send("Email ou senha inválido!")
    }

    const compararSenha = bcrypt.compareSync(senha, hashed);

    if (!compararSenha) {
        return res.status(401).send("Email ou senha inválido!")
    }

    return 
};