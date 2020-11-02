const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const MySQLConnection = require('./../database');
const Usuario = require('./../models/usuario/usuario');

const save = async (req = request, res = response) => {
    const { idUsuario, username, password, idCargo, idEmpleado } = req.body;
    try{
        const { usuarioRepository } = await MySQLConnection.getRepositories();
        const usuario = new Usuario({
            idUsuario, username, password, idCargo, idEmpleado
        });
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuarioRepository.save(usuario);
        res.json({ ok: true, msg: 'Usuario guardado correctamente.' })
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

module.exports = {
    save
};

