const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const MySQLConnection = require('./../database');
const Auth = require('./../models/auth/auth');
const { staticFrontendMenu } = require('./../utils/menu-frontend');

const login = async (req = request, res = response) => {
    const { username, password } = req.body;
    try{
        const { authRepository } = await MySQLConnection.getRepositories();
        const auth = new Auth({
            username, password
        });
        const [ authDB ] = await authRepository.login(auth);
        if(!authDB)
            return res.status(404).json({ ok: false, msg: 'Usuario o contraseña incorrectos.' });
        const validatePass = bcrypt.compareSync(password, authDB.password);
        if(!validatePass)
            return res.status(404).json({ ok: false, msg: 'Usuario o contraseña incorrectos.' });

        delete authDB.password;
        const staticFrontendMenuRef = staticFrontendMenu.filter( ({ roles }) => roles.includes(authDB.id_rol) );
        res.json({ ok: true, user: authDB, staticFrontendMenuRef });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

module.exports = {
    login
}