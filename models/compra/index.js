const CheckDisponibilidad = require('./check-disponibilidad');

const register = ({ connection }) => {

    const findAllItemsWithState = async () =>{
        const sqlQuery = `select numero_item, descripcion, ubicacion, 
            punto_reorden, cantidad_disponible,
            case when punto_reorden >= cantidad_disponible then 
            'Abastecer' else 'Estable' end as estado_item
            from db_sys_account.inventario
            where estado = true
            order by estado_item asc`;

        return connection.query(sqlQuery)
            .then( (vq) => vq )
            .catch( (err) => { throw err; } ); 
    };

    const checkDisponibilidad = async (ckDisponibilidad = new CheckDisponibilidad()) =>{
        const sqlQuery = `insert into verificar_disponibilidad 
            (hora, fecha, id_empleado) 
            values (?, ?, ?)`;

        return connection.query(sqlQuery, [ 
            ckDisponibilidad.hora, ckDisponibilidad.fecha, ckDisponibilidad.idEmpleado 
        ]).then( (vq) => vq )
        .catch( (err) => { throw err; } ); 
    }

    return {
        findAllItemsWithState,
        checkDisponibilidad
    };
};

module.exports = { register };