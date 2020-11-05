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
        from db_sys_account.inventario
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
        const sqlQuery = `INSERT INTO orden_inventario (id_numero_orden, id_numero_item)
                        VALUES (?,?)`;

        return connection.query(sqlQuery, [
                detallePedido.idNumeroOrden, detallePedido.idNumeroItem, detallePedido.cantidad, detallePedido.descuento
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }
    const envioItems = async(envioItems = new EnvioItems()) => {
        const sqlQuery = `insert into entregar_producto (id, importe, fecha_envio, fecha_cierre, numero_comprobante, id_numero_cliente, id_empleado, id_numero_orden, id_codigo_factura_cliente)
        VALUES (?,?,?,?,?,?,?,?,?);`;

        return connection.query(sqlQuery, [
                envioItems.id, envioItems.importe, envioItems.fechaEnvio, envioItems.fechaCierre, envioItems.numeroComprobante, envioItems.idNumeroCliente,
                envioItems.idEmpleado, envioItems.numeroOrden, envioItems.idCodigoFacturaCliente
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }

    const detalleEnvio = async(detalleEnvio = new DetalleEnvio()) => {
        const sqlQuery = `INSERT INTO inventario_entrega_producto (id_entregar_producto, id_numero_item, cantidad_enviada, estado_envio, observacion)
        VALUES (?,?,?,?,?);`;

        return connection.query(sqlQuery, [
                detalleEnvio.idEntregarProducto, detalleEnvio.idNumeroItem, detalleEnvio.cantidadEnviada, detalleEnvio.estadoEnvio, detalleEnvio.observacion
            ]).then((vq) => vq)
            .catch((err) => { throw err; });
    }


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
        detalleEnvio

    };
};

module.exports = { register };
