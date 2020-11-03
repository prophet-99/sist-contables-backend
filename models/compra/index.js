const CheckDisponibilidad = require('./check-disponibilidad');
const CheckCompra = require('./check-compra');
const DetalleDisponibilidad = require('./detalle-verificar');
const DetalleOrden = require('./detalle-orden');
const RecibirItems = require('./recibir-items');

const register = ({ connection }) => {

    const findAllItemsWithState = async() => {
        const sqlQuery = `select numero_item, descripcion, ubicacion, 
            punto_reorden, cantidad_disponible,
            case when punto_reorden >= cantidad_disponible then 
            'Abastecer' else 'Estable' end as estado_item
            from db_sys_account.inventario
            where estado = true
            order by estado_item asc`;

        return connection.query(sqlQuery)
            .then((vq) => vq)
            .catch((err) => { throw err; });
    };

    const checkDisponibilidad = async(ckDisponibilidad = new CheckDisponibilidad()) => {
        const sqlQuery = `insert into verificar_disponibilidad 
            (hora, fecha, id_empleado) 
            values (?, ?, ?)`;

        return connection.query(sqlQuery, [
                ckDisponibilidad.hora, ckDisponibilidad.fecha, ckDisponibilidad.idEmpleado
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }

    const getIdVerificar = async() => {
        const sqlQuery = `select id from verificar_disponibilidad
        order by id desc limit 1`;

        return connection.query(sqlQuery)
            .then((vq) => vq)
            .catch((err) => { throw err; });
    }

    const detalleDisponibilidad = async(verifInventario = new DetalleDisponibilidad()) => {
        const sqlQuery = `INSERT INTO verificar_inventario(id_numero_item, id_verificar_disponibilidad, 
            descripcion, reorden, cantidad_solicitada)
            values( ? , ? , ? , ? , ? )`;

        return connection.query(sqlQuery, [
                verifInventario.idNumeroItem, verifInventario.idVerificarDisponibilidad,
                verifInventario.descripcion, verifInventario.reorden, verifInventario.cantidadSolicitada
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }

    const checkCompra = async(ckCompra = new CheckCompra()) => {
        const sqlQuery = `INSERT INTO ordenar_producto(numero_orden_compra, descripcion, fecha_pedido, fecha_entrega_esperada,
            precio_total_esperado, id_proveedor, id_empleado, id_verificar_disponibilidad)
        values (?,?,?,?,?,?,?,?)`;

        return connection.query(sqlQuery, [
                ckCompra.numeroOrden, ckCompra.descripcion, ckCompra.fechaPedido, ckCompra.fechaEsperada,
                ckCompra.precioTotalEsperado, ckCompra.idProveedor, ckCompra.idEmpleado, ckCompra.idVerificarDisponibilidad
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }

    const detalleOrden = async(detalleOrden = new DetalleOrden()) => {
        const sqlQuery = `INSERT INTO inventario_ordenar_producto (id_numero_item, id_numero_orden_compra, cantidad_orden, precio_unitario_compra )
        VALUES (?,?,?,?)`;

        return connection.query(sqlQuery, [
                detalleOrden.idNumeroItem, detalleOrden.idNumeroOrdenCompra, detalleOrden.cantidad, detalleOrden.precioUnitarioCompra
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }

    const recibirItems = async(items = new RecibirItems()) => {
        const sqlQuery = `INSERT into recibir_producto (numero_comprobante, fecha_recepcion, monto_adeuda, transportista, numero_recibo_inventario, id_proveedor, id_empleado, id_numero_orden_compra)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        return connection.query(sqlQuery, [
                items.numeroComprobante, items.fechaRecepcion, items.montoAdeuda, items.transportista,
                items.numeroReciboInventario, items.idProveedor, items.idEmpleado, items.idNumeroOrdenCompra
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }

    return {
        findAllItemsWithState,
        checkDisponibilidad,
        getIdVerificar,
        detalleDisponibilidad,
        checkCompra,
        detalleOrden,
        recibirItems
    };
};

module.exports = { register };