
const register = ({ connection }) => {
    
    const transaccionesDesembolsarPorFecha = async (fecha) => {
        const sqlQuery = `CALL usp_transaccionesdesembolsarporfecha(?)`;

        return connection.query(sqlQuery,[fecha])
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const transaccionesRecibirPorFecha = async (fecha) => {
        const sqlQuery = `CALL usp_transaccionesrecibirporfecha(?)`;

        return connection.query(sqlQuery,[fecha])
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    
    
    };
    
    const tiempoPromedioEntrega  = async () => {
        const sqlQuery = `SELECT DATEDIFF(ep.fecha_envio,t.fecha_pedido) as Tiempo
        FROM tomar_orden t
        INNER JOIN orden_inventario oi on t.numero_orden = oi.id_numero_orden
        INNER JOIN inventario i on oi.id_numero_item = i.numero_item
        INNER JOIN inventario_entrega_producto iep on i.numero_item = iep.id_numero_item
        INNER JOIN entregar_producto ep on iep.id_entregar_producto = ep.id;`;

        return connection.query(sqlQuery)
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    const inventarioRecomendado = async () => {
        const sqlQuery = `SELECT rr.numero_recomendacion as idrecomendacion, i.numero_item as n°item, rr.descripcion 
        FROM inventario i
        INNER JOIN fijar_recomendacion fr ON i.numero_item = fr.id_numero_item
        INNER JOIN registrar_recomendacion rr ON fr.id_numero_recomendacion = rr.numero_recomendacion LIMIT 7;`;

        return connection.query(sqlQuery)
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    return {    
        transaccionesDesembolsarPorFecha,
        transaccionesRecibirPorFecha,
        tiempoPromedioEntrega,
        inventarioRecomendado,
    };
};

module.exports = { register };