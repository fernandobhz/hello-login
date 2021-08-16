const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');



exports.efetuarLogin = async ({email, senha}) => {
    const usuarioValido = await Usuario.findOne({
        where: {
            email
        }
    });

    if (!usuarioValido) {
        throw new Error("Email ou senha inválido!")
    }

    const compararSenha = bcrypt.compareSync(senha, usuarioValido.senha);

    if (!compararSenha) {
        throw new Error("Email ou senha inválido!")
    }

    return usuarioValido.dataValues;
};