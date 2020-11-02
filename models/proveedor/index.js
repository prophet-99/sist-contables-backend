const Proveedor = require('./proveedor');

const register = ({ connection }) => {
    
    const findAll = async () => {
        const sqlQuery = `select p.id, nombre, direccion, ruc, numero_cuenta, numero_envios_fallados,
            numero_envios_incompletos, observaciones_comerciales, plazo_entrega_id, 
            pe.descripcion as plazo_entrega
            from proveedor p
            inner join plazo_entrega pe on pe.id = p.plazo_entrega_id
            where estado = true`;

        return connection.query(sqlQuery)
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const findAllInactives = async () => {
        const sqlQuery = `select p.id, nombre, direccion, ruc, numero_cuenta, numero_envios_fallados,
            numero_envios_incompletos, observaciones_comerciales, plazo_entrega_id, 
            pe.descripcion as plazo_entrega
            from proveedor p
            inner join plazo_entrega pe on pe.id = p.plazo_entrega_id
            where estado = false`;

        return connection.query(sqlQuery)
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const findByNameOrRuc = async (paramSearch) => {
        const sqlQuery = `select p.id, nombre, direccion, ruc, numero_cuenta, numero_envios_fallados,
            numero_envios_incompletos, observaciones_comerciales, plazo_entrega_id, 
            pe.descripcion as plazo_entrega
            from proveedor p
            inner join plazo_entrega pe on pe.id = p.plazo_entrega_id
            where estado = true and ( upper(nombre) like upper(concat('%', ?, '%'))
            or ruc like concat('%', ?, '%') )`;

        return connection.query(sqlQuery, [ paramSearch, paramSearch ])
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const findByNameOrRucInactives = async (paramSearch) => {
        const sqlQuery = `select p.id, nombre, direccion, ruc, numero_cuenta, numero_envios_fallados,
            numero_envios_incompletos, observaciones_comerciales, plazo_entrega_id, 
            pe.descripcion as plazo_entrega
            from proveedor p
            inner join plazo_entrega pe on pe.id = p.plazo_entrega_id
            where estado = false and ( upper(nombre) like upper(concat('%', ?, '%'))
            or ruc like concat('%', ?, '%') )`;

        return connection.query(sqlQuery, [ paramSearch, paramSearch ])
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const save = async (proveedor = new Proveedor()) => {
        const sqlQuery = `call usp_createProveedor(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        return connection.query(sqlQuery, [ 
            proveedor.id, proveedor.nombre, proveedor.direccion,
            proveedor.ruc, proveedor.numeroCuenta, proveedor.numeroEnviosFallados,
            proveedor.numeroEnviosIncompletos, proveedor.observacionesComerciales,
            proveedor.idPlazoEntrega
        ]).then( (vq) => vq )
        .catch( (err) => { throw err; } );
    };

    const deleteById = async (idProveedor) => {
        const sqlQuery = 'update proveedor set estado = false where id = ?';

        return connection.query(sqlQuery, [ idProveedor ])
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    return {
        findAll,
        findAllInactives,
        findByNameOrRuc,
        findByNameOrRucInactives,
        save,
        deleteById
    };
};

module.exports = { register };