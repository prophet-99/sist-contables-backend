const Usuario = require('./usuario');

const register = ({ connection }) => {

    const save = async (usuario = new Usuario()) => {
        const sqlQuery = 'call usp_createUsuario(?, ?, ?, ?, ?)';

        return connection.query( sqlQuery, [ 
            usuario.idUsuario, usuario.username, usuario.password, 
            usuario.idCargo, usuario.idEmpleado 
        ]).then( (vq) => vq )
        .catch( (err) => { throw err; } ); 
    };

    return {
        save
    };
};

module.exports = { register };
