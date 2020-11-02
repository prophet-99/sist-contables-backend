const Cliente = require('./cliente');

const register = ({ connection }) => {
    
    const findAll = async () => {
        const sqlQuery = `select id, dni, nombre, direccion, celular, numero_cuenta, 
            credito_disponible, credito_asignado 
            from cliente 
            where estado = true`;

        return connection.query(sqlQuery)
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const findAllInactives = async () => {
        const sqlQuery = `select id, dni, nombre, direccion, celular, numero_cuenta, 
            credito_disponible, credito_asignado 
            from cliente 
            where estado = false`;

        return connection.query(sqlQuery)
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const findByNameOrDni = async (paramSearch) => {
        const sqlQuery = `select id, dni, nombre, direccion, celular, numero_cuenta, 
            credito_disponible, credito_asignado 
            from cliente 
            where estado = true and ( upper(nombre) like upper(concat('%', ?, '%')) 
            or dni like concat('%', ?, '%') )`;

        return connection.query(sqlQuery, [ paramSearch, paramSearch ])
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const findByNameOrDniInactives = async (paramSearch) => {
        const sqlQuery = `select id, dni, nombre, direccion, celular, numero_cuenta, 
            credito_disponible, credito_asignado 
            from cliente 
            where estado = false and ( upper(nombre) like upper(concat('%', ?, '%')) 
            or dni like concat('%', ?, '%') )`;

        return connection.query(sqlQuery, [ paramSearch, paramSearch ])
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const save = async (cliente = new Cliente()) => {
        const sqlQuery = `call usp_createCliente(?, ?, ?, ?, ?, ?, ?, ?)`;
        
        return connection.query(sqlQuery, [ 
            cliente.id, cliente.dni, cliente.nombre, cliente.direccion,
            cliente.celular, cliente.numeroCuenta, cliente.creditoDisponible,
            cliente.creditoAsignado
        ]).then( (vq) => vq )
        .catch( (err) => { throw err; } );
    };

    const deleteById = async (idCliente) => {
        const sqlQuery = 'update cliente set estado = false where id = ?';

        return connection.query(sqlQuery, [ idCliente ])
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    return {
        findAll,
        findAllInactives,
        findByNameOrDni,
        findByNameOrDniInactives,
        save,
        deleteById
    };
};

module.exports = { register };