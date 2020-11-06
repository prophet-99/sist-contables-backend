const CheckDisponibilidad = require('./check-disponibilidad');
const CheckCompra = require('./check-compra');
const DetalleDisponibilidad = require('./detalle-verificar');
const DetalleOrden = require('./detalle-orden');
const RecibirItems = require('./recibir-items');
const DetalleRecepcion = require('./detalle-recepcion');
const DesembolsoEfectivo = require('./desembolso-efectivo');

const register = ({ connection }) => {

    const findAllItemsWithState = async() => {
        const sqlQuery = `select numero_item, descripcion, ubicacion, 
            punto_reorden, cantidad_disponible,
            case when punto_reorden >= cantidad_disponible then 
            'Abastecer' else 'Estable' end as estado_item
            from inventario
            where estado = true
            order by estado_item asc`;

        return connection.query(sqlQuery)
            .then((vq) => vq)
            .catch((err) => { throw err; });
    };

    const findAllItemsWithStateFixeds = async() => {
        const sqlQuery = `select numero_item, descripcion, ubicacion, 
            punto_reorden, cantidad_disponible,
            case when punto_reorden >= cantidad_disponible then 
            'Abastecer' else 'Estable' end as estado_item
            from inventario
            where estado = true and id_categoria = 3 
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

    const insertFactura = async(codigo) => {
        const sqlQuery = `INSERT INTO factura (codigo_factura) values (?)`;
        return connection.query(sqlQuery, [
                codigo
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

    const detalleRecepcion = async(detalleRecepcion = new DetalleRecepcion()) => {
        const sqlQuery = `INSERT INTO inventario_recibir_producto (id_numero_item, id_numero_comprobante, cantidad_recibida, costo_unitario_actual, estado_recepcion, observacion)
        VALUES (?, ?, ?, ?, ?, ?)`;

        return connection.query(sqlQuery, [
                detalleRecepcion.idNumeroItem, detalleRecepcion.idNumeroComprobante, detalleRecepcion.cantidadRecibida, detalleRecepcion.costoUnitarioActual, detalleRecepcion.estado_recepcion, detalleRecepcion.observacion
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }

    const findAllOrdenesCompra = async() => {
        const sqlQuery = `SELECT distinct numero_orden_compra, o.fecha_pedido, o.fecha_entrega_esperada, p.nombre as proveedor, p.ruc, o.descripcion,
            o.precio_total_esperado, o.id_empleado, concat(e.nombres, ' ', e.apellidos) as empleado, e.id_cargo, rp.id_codigo_factura as proveedor_factura, 
            p.id as id_proveedor, dc.id as pago
            from  ordenar_producto o
            inner join empleado e on e.id = o.id_empleado
            inner join proveedor p on p.id = o.id_proveedor
            left join recibir_producto rp on rp.id_numero_orden_compra = o.numero_orden_compra
            left join desembolsar_efectivo_compras dc on dc.id_numero_orden_compra = numero_orden_compra`;
        return connection.query(sqlQuery)
        .then((vq) => vq)
        .catch((err) => { throw err; });
    };

    const findAllOrdenesCompraByCodigo = async(idOrdenCompra) => {
        const sqlQuery = `SELECT distinct numero_orden_compra, o.fecha_pedido, o.fecha_entrega_esperada, p.nombre as proveedor, p.ruc, o.descripcion,
            o.precio_total_esperado, o.id_empleado, concat(e.nombres, ' ', e.apellidos) as empleado, e.id_cargo, rp.id_codigo_factura as proveedor_factura, 
            p.id as id_proveedor, dc.id as pago
            from  ordenar_producto o
            inner join empleado e on e.id = o.id_empleado
            inner join proveedor p on p.id = o.id_proveedor
            left join recibir_producto rp on rp.id_numero_orden_compra = o.numero_orden_compra
            left join desembolsar_efectivo_compras dc on dc.id_numero_orden_compra = numero_orden_compra
            WHERE numero_orden_compra like concat('%', ?, '%')`;
        return connection.query(sqlQuery, [ idOrdenCompra ])
        .then((vq) => vq)
        .catch((err) => { throw err; });
    };

    const findAllDetalleOrdenesCompra = async(idOrdenCompra) => {
        const sqlQuery = `SELECT o.fecha_pedido as fechaEmision, o.fecha_entrega_esperada, p.nombre as proveedor,
            p.ruc, o.descripcion, op.id_numero_item, i.descripcion as producto, op.cantidad_orden,
            op.precio_unitario_compra, o.precio_total_esperado, e.nombres, op.precio_unitario_compra * op.cantidad_orden as importe
            from  ordenar_producto o
            INNER JOIN verificar_disponibilidad v ON v.id=o.id_verificar_disponibilidad
            INNER JOIN inventario_ordenar_producto op on op.id_numero_orden_compra = o.numero_orden_compra
            INNER JOIN inventario i ON i.numero_item= op.id_numero_item
            INNER JOIN empleado e on e.id = o.id_empleado
            INNER JOIN proveedor p on p.id = o.id_proveedor
            where numero_orden_compra like ?`;
        return connection.query(sqlQuery, [ idOrdenCompra ])
        .then((vq) => vq)
        .catch((err) => { throw err; });
    };

    const desembolsarEfectivo = async (desembolsoEfectivo = new DesembolsoEfectivo()) => {
        const sqlQuery = `call usp_desembolsar_compras(?, ?, ?, ?, ?, ?, ?)`;

        return connection.query(sqlQuery, [ 
            desembolsoEfectivo.monto, desembolsoEfectivo.fecha, desembolsoEfectivo.idEmpleado,
            desembolsoEfectivo.idNumeroCuenta, desembolsoEfectivo.idNumeroOrdenCompra, 
            desembolsoEfectivo.idCodigoFactura, desembolsoEfectivo.idProveedor
        ]).then((vq) => vq)
        .catch((err) => { throw err; });
    };

    return {
        findAllItemsWithState,
        findAllItemsWithStateFixeds,
        checkDisponibilidad,
        getIdVerificar,
        detalleDisponibilidad,
        checkCompra,
        detalleOrden,
        insertFactura,
        recibirItems,
        detalleRecepcion,
        findAllOrdenesCompra,
        findAllOrdenesCompraByCodigo,
        findAllDetalleOrdenesCompra,
        desembolsarEfectivo
    };
};

module.exports = { register };