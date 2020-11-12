const AddRecomendacion = require('./add-recomendacion');
const CheckDisponibilidad = require('./check-disponibilidad');
const DetalleEnvio = require('./detalle-envio');
const DetallePedido = require('./detalle-pedido');
const DetalleDisponibilidad = require('./detalle-verificar');
const EnvioItems = require('./envio-items');
const TomarOrden = require('./tomar-orden');

const register = ({ connection }) => {

    const findAllItemsWithTasaUso = async() => {
        const sqlQuery = `select *
        from inventario
        order by tasa_uso desc`;

        return connection.query(sqlQuery)
            .then((vq) => vq)
            .catch((err) => { throw err; });
    }

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
        const sqlQuery = `INSERT INTO verificar_inventario(id_numero_item, id_verificar_disponibilidad, descripcion,
                        cantidad_solicitada)
                    values( ? , ? , "", ?)`;

        return connection.query(sqlQuery, [
                verifInventario.idNumeroItem, verifInventario.idVerificarDisponibilidad,
                verifInventario.cantidadSolicitada
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }

    const addRecomendacion = async(addRecomendacion = new AddRecomendacion()) => {
        const sqlQuery = `insert into registrar_recomendacion (numero_recomendacion, descripcion, id_verificar_disponibilidad, id_numero_cliente) 
                    values (?, ?, ?, ?)`;

        return connection.query(sqlQuery, [
                addRecomendacion.numeroRecomendacion, addRecomendacion.descripcion, addRecomendacion.idVerificarDisponibilidad, addRecomendacion.idNumeroCliente
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }

    const detalleRecomendacion = async(addRecomendacion = new AddRecomendacion()) => {
        const sqlQuery = `insert into fijar_recomendacion (id_numero_recomendacion, id_numero_item) 
                    values (?,?)`;

        return connection.query(sqlQuery, [
                addRecomendacion.numeroRecomendacion, addRecomendacion.idNumeroItem
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }

    const tomarOrden = async(tomarOrden = new TomarOrden()) => {
        const sqlQuery = `INSERT INTO tomar_orden(numero_orden, fecha_pedido, fecha_prometida, condiciones, id_verificar_disponibilidad, id_numero_cliente, id_empleado)
                        VALUES (?,?,?,?,?,?,?)`;

        return connection.query(sqlQuery, [
                tomarOrden.numeroOrden, tomarOrden.fechaPedido, tomarOrden.fechaPrometida, tomarOrden.condiciones,
                tomarOrden.idVerificarDisponibilidad, tomarOrden.idNumeroCliente, tomarOrden.idEmpleado
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }

    const detallePedido = async(detallePedido = new DetallePedido()) => {
        const sqlQuery = `INSERT INTO orden_inventario (id_numero_orden, id_numero_item, descuento)
                        VALUES (?,?, 0)`;

        return connection.query(sqlQuery, [
                detallePedido.idNumeroOrden, detallePedido.idNumeroItem
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }
    const envioItems = async(envioItems = new EnvioItems()) => {
        const sqlQuery = `insert into entregar_producto (importe, fecha_envio, fecha_cierre, numero_comprobante,
            id_numero_cliente, id_empleado, id_numero_orden, id_codigo_factura_cliente)
            VALUES (?,?,?,?,?,?,?,?);`;
            
        return connection.query(sqlQuery, [
                envioItems.importe, envioItems.fechaEnvio, envioItems.fechaCierre, envioItems.numeroComprobante, 
                envioItems.idNumeroCliente, envioItems.idEmpleado, envioItems.idNumeroOrden, envioItems.idCodigoFacturaCliente
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }

    const detalleEnvio = async(detalleEnvio = new DetalleEnvio()) => {
        const sqlQuery = `INSERT INTO inventario_entrega_producto (id_entregar_producto, id_numero_item, cantidad_enviada, estado_envio, observacion)
        VALUES (?,?,?,?,?);`;

        return connection.query(sqlQuery, [
                detalleEnvio.idEntregarProducto, detalleEnvio.idNumeroItem, detalleEnvio.cantidadEnviada, 
                detalleEnvio.estadoEnvio, detalleEnvio.observacion
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }

    const insertFacturaCliente = async(codigoFactura) => {
        const sqlQuery = `insert into factura_cliente values(?)`;

        return connection.query(sqlQuery, [ codigoFactura ])
            .then((vq) => vq)
            .catch((err) => { throw err; });
    };

    const findAllTomarOrdenes = async() => {
        const sqlQuery = `select distinct ep.fecha_envio, ep.fecha_cierre, ep.numero_comprobante, c.id as idCliente, c.nombre as cliente,
            emp.id as idEmpleado, concat(emp.nombres, ' ', emp.apellidos) as empleado, importe, id_codigo_factura_cliente as factura,
            t.numero_orden as numeroOrden
            from entregar_producto ep
            inner join cliente c on c.id = ep.id_numero_cliente
            inner join empleado emp on emp.id = ep.id_empleado
            inner join tomar_orden t on ep.id_numero_orden = t.numero_orden`;

        return connection.query(sqlQuery)
        .then((vq) => vq)
        .catch((err) => { throw err; });
    };

    const findAllTomarOrdenesByCodigo = async(idTomarOrden) => {
        const sqlQuery = `select distinct ep.fecha_envio, ep.fecha_cierre, ep.numero_comprobante, c.id as idCliente, c.nombre as cliente,
            emp.id as idEmpleado, concat(emp.nombres, ' ', emp.apellidos) as empleado, importe, id_codigo_factura_cliente as factura,
            t.numero_orden as numeroOrden
            from entregar_producto ep
            inner join cliente c on c.id = ep.id_numero_cliente
            inner join empleado emp on emp.id = ep.id_empleado
            inner join tomar_orden t on ep.id_numero_orden = t.numero_orden
            where id_codigo_factura_cliente like ?`;

        return connection.query(sqlQuery, [ idTomarOrden ])
        .then((vq) => vq)
        .catch((err) => { throw err; });
    };

    const findAllDetalleRecomendaciones = async(idRecomendacion) => {
        const sqlQuery = `select numero_recomendacion, re.descripcion as recomendacion, fecha, i.numero_item, i.descripcion as item,
            i.cantidad_disponible, i.costo_unitario
            from registrar_recomendacion re
            inner join fijar_recomendacion fr on fr.id_numero_recomendacion = re.numero_recomendacion
            inner join verificar_disponibilidad vd on vd.id = re.id_verificar_disponibilidad
            inner join inventario i on i.numero_item = fr.id_numero_item
            where numero_recomendacion like ?`;

        return connection.query(sqlQuery, [ idRecomendacion ])
        .then((vq) => vq)
        .catch((err) => { throw err; });
    };
    
    const listarRecomendacion = async() => {
        const sqlQuery = `SELECT c.nombre,concat(e.nombres, ' ', e.apellidos) as empleado, e.rr.numero_recomendacion, rr.descripcion, rr.id_verificar_disponibilidad, rr.id_numero_cliente
        FROM registrar_recomendacion rr
        INNER JOIN cliente c ON rr.id_numero_cliente = c.id
        INNER JOIN tomar_orden to ON to.id_numero_cliente = c.id
        INNER JOIN empleado e ON to.id_empleado = e.id`;

        return connection.query(sqlQuery)
        .then((vq) => vq)
        .catch((err) => { throw err; });
    };
    
    return {
        findAllItemsWithTasaUso,
        checkDisponibilidad,
        getIdVerificar,
        detalleDisponibilidad,
        addRecomendacion,
        detalleRecomendacion,
        tomarOrden,
        detallePedido,
        envioItems,
        detalleEnvio,
        insertFacturaCliente,
        findAllTomarOrdenes,
        findAllTomarOrdenesByCodigo,
        findAllDetalleRecomendaciones,
        listarRecomendacion
    };
};

module.exports = { register };
