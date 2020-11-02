const Inventario = require('./inventario');

const register = ({ connection }) => {
    
    const findAll = async () => {
        const sqlQuery = `select numero_item, inv.descripcion as item, ubicacion, cantidad_disponible_venta,
            cantidad_disponible, punto_reorden, costo_unitario, tasa_uso, id_categoria,
            c.descripcion as categoria
            from inventario inv
            inner join categoria c on c.id = inv.id_categoria
            and estado = true`;

        return connection.query(sqlQuery)
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const findAllInactives = async () => {
        const sqlQuery = `select numero_item, inv.descripcion as item, ubicacion, cantidad_disponible_venta,
            cantidad_disponible, punto_reorden, costo_unitario, tasa_uso, id_categoria,
            c.descripcion as categoria
            from inventario inv
            inner join categoria c on c.id = inv.id_categoria
            and estado = false`;

        return connection.query(sqlQuery)
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const findByCodigoOrName = async (paramSearch) => {
        const sqlQuery = `select numero_item, inv.descripcion as item, ubicacion, cantidad_disponible_venta,
            cantidad_disponible, punto_reorden, costo_unitario, tasa_uso, id_categoria,
            c.descripcion as categoria
            from inventario inv
            inner join categoria c on c.id = inv.id_categoria
            and estado = true and ( upper(numero_item) like upper(concat('%', ?, '%'))
            or inv.descripcion like upper(concat('%', ?, '%')) )`;

        return connection.query(sqlQuery, [ paramSearch, paramSearch ])
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const findByCodigoOrNameInactives = async (paramSearch) => {
        const sqlQuery = `select numero_item, inv.descripcion as item, ubicacion, cantidad_disponible_venta,
            cantidad_disponible, punto_reorden, costo_unitario, tasa_uso, id_categoria,
            c.descripcion as categoria
            from inventario inv
            inner join categoria c on c.id = inv.id_categoria
            and estado = false and ( upper(numero_item) like upper(concat('%', ?, '%'))
            or inv.descripcion like upper(concat('%', ?, '%')) )`;

        return connection.query(sqlQuery, [ paramSearch, paramSearch ])
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const save = async (inventario = new Inventario(), action) => {
        const sqlQuery = `call usp_createItemInventario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        return connection.query(sqlQuery, [ 
            inventario.numeroItem,  inventario.descripcion, inventario.ubicacion,
            inventario.cantidadDisponibleVenta, inventario.cantidadDiponible, inventario.puntoReorden,
            inventario.costoUnitario, inventario.tasaUso, inventario.idCategoria, action
        ]).then( (vq) => vq )
        .catch( (err) => { throw err; } );
    };

    const deleteById = async (idItem) => {
        const sqlQuery = 'update inventario set estado = false where numero_item = ?';

        return connection.query(sqlQuery, [ idItem ])
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    return {
        findAll,
        findAllInactives,
        findByCodigoOrName,
        findByCodigoOrNameInactives,
        save,
        deleteById
    };
};

module.exports = { register };