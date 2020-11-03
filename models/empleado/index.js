const Empleado = require('./empleado');

const register = ({ connection }) => {
    
    const findAll = async () => {
        const sqlQuery = `select emp.id as id_empleado, emp.dni, emp.fecha_nacimiento, 
            emp.fecha_contratacion, emp.nombres, emp.apellidos, emp.tarifa_pago, 
            emp.email, us.id as id_user, us.username, c.id as id_rol, c.descripcion as rol
            from empleado emp
            left join usuario us on us.id  = emp.id_usuario
            inner join cargo c on emp.id_cargo = c.id
            where emp.estado = true`;

        return connection.query(sqlQuery)
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const findAllInactives = async () => {
        const sqlQuery = `select emp.id as id_empleado, emp.dni, emp.fecha_nacimiento, 
            emp.fecha_contratacion, emp.nombres, emp.apellidos, emp.tarifa_pago, 
            emp.email, us.id as id_user, us.username, c.id as id_rol, c.descripcion as rol
            from empleado emp
            left join usuario us on us.id  = emp.id_usuario
            inner join cargo c on emp.id_cargo = c.id
            where emp.estado = false`;

        return connection.query(sqlQuery)
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const findByNameOrSurname = async (paramSearch) => {
        const sqlQuery = `select emp.id as id_empleado, emp.dni, emp.fecha_nacimiento, 
            emp.fecha_contratacion, emp.nombres, emp.apellidos, emp.tarifa_pago, 
            emp.email, us.id as id_user, us.username, c.id as id_rol, c.descripcion as rol
            from empleado emp
            left join usuario us on us.id  = emp.id_usuario
            inner join cargo c on emp.id_cargo = c.id
            where emp.estado = true and ( upper(emp.nombres) like upper(concat('%', ?, '%')) 
            or upper(emp.apellidos) like upper(concat('%', ?, '%')) )`;

        return connection.query(sqlQuery, [ paramSearch, paramSearch ])
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const findByNameOrSurnameInactives = async (paramSearch) => {
        const sqlQuery = `select emp.id as id_empleado, emp.dni, emp.fecha_nacimiento, 
            emp.fecha_contratacion, emp.nombres, emp.apellidos, emp.tarifa_pago, 
            emp.email, us.id as id_user, us.username, c.id as id_rol, c.descripcion as rol
            from empleado emp
            left join usuario us on us.id  = emp.id_usuario
            inner join cargo c on emp.id_cargo = c.id
            where emp.estado = false and ( upper(emp.nombres) like upper(concat('%', ?, '%')) 
            or upper(emp.apellidos) like upper(concat('%', ?, '%')) )`;

        return connection.query(sqlQuery, [ paramSearch, paramSearch ])
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const save = async (empleado = new Empleado()) => {
        const sqlQuery = `call usp_createEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        return connection.query(sqlQuery, [ 
            empleado.id, empleado.dni, empleado.fechaNacimiento, empleado.fechaContratacion, 
            empleado.nombres, empleado.apellidos, empleado.tarifaPago, empleado.email, 
            empleado.idCargo
        ]).then( (vq) => vq )
        .catch( (err) => { throw err; } );
    };

    const deleteById = async (idEmpleado) => {
        const sqlQuery = 'update empleado set estado = false where id = ?';

        return connection.query(sqlQuery, [ idEmpleado ])
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const getAllCargos = async () => {
        const sqlQuery = 'select id, descripcion from cargo';

        return connection.query(sqlQuery)
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    return {
        findAll,
        findAllInactives,
        findByNameOrSurname,
        findByNameOrSurnameInactives,
        save,
        deleteById,
        getAllCargos
    };
};

module.exports = { register };