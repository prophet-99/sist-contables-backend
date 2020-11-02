const Auth = require('./auth');

const register = ({ connection }) => {

    const login = async (auth = new Auth()) => {
        const sqlQuery = `select emp.id as id_empleado, us.username, us.password, 
            emp.nombres, emp.apellidos, c.id as id_rol, c.descripcion as rol
            from empleado emp
            inner join usuario us on us.id  = emp.id_usuario
            inner join cargo c on emp.id_cargo = c.id
            where emp.estado = true and us.username like ?`;
        
        return connection.query( sqlQuery, [ auth.username ])
            .then( (vq) => vq )
            .catch( (err) => { throw err; } ); 
    };

    return {
        login
    };
};

module.exports = { register };