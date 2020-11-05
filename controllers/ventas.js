const { request, response } = require('express');
const MySQLConnection = require('./../database');
const DetalleDisponibilidad = require('../models/venta/detalle-verificar');
const CheckDisponibilidad = require('./../models/venta/check-disponibilidad');
const AddRecomendacion = require('../models/venta/add-recomendacion');
const TomarOrden = require('../models/venta/tomar-orden');
const DetallePedido = require('../models/venta/detalle-pedido');
const EnvioItems = require('../models/venta/envio-items');
const DetalleEnvio = require('../models/venta/detalle-envio');

const findAllItemsWithTasaUso = async(req = request, res = response) => {
    try {
        const { ventaRepository } = await MySQLConnection.getRepositories();
        const items = await ventaRepository.findAllItemsWithTasaUso();
        res.json({ ok: true, items });
    } catch (err) {
        res.status(500).json({ ok: false, msg: err });
    }
};

const checkDisponibilidad = async(req = request, res = response) => {

    const { hora, fecha, idEmpleado } = req.body;
    try {
        const { ventaRepository } = await MySQLConnection.getRepositories();
        const checkDisponibilidad = new CheckDisponibilidad({
            hora,
            fecha,
            idEmpleado
        });
        await ventaRepository.checkDisponibilidad(checkDisponibilidad);
        const idVerificar = await ventaRepository.getIdVerificar();
        res.json({ ok: true, idVerificar: idVerificar[0].id });
    } catch (err) {
        res.status(500).json({ ok: false, msg: err });
    }
};

const detalleDisponibilidad = async(req = request, res = response) => {

    const { detalleItems } = req.body;
    try {
        for (let i = 0; i < detalleItems.length; i++) {
            const { idNumeroItem, idVerificarDisponibilidad, descripcion, cantidadSolicitada } = detalleItems[i];
            const { ventaRepository } = await MySQLConnection.getRepositories();
            const detalleDisponibilidad = new DetalleDisponibilidad({
                idNumeroItem,
                idVerificarDisponibilidad,
                descripcion,
                cantidadSolicitada
            });
            await ventaRepository.detalleDisponibilidad(detalleDisponibilidad);
        }
        res.json({ ok: true, msg: 'Detalle de verificación registrada Correctamente' });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err });
    }
};

const addRecomendacion = async(req = request, res = response) => {

    const { numeroRecomendacion, descripcion, idVerificarDisponibilidad, idNumeroCliente } = req.body;
    try {
        const { ventaRepository } = await MySQLConnection.getRepositories();
        const addRecomendacion = new AddRecomendacion({
            numeroRecomendacion,
            descripcion,
            idVerificarDisponibilidad,
            idNumeroCliente
        });
        await ventaRepository.addRecomendacion(addRecomendacion);
        res.json({ ok: true, msg: 'Recomendación registrada Correctamente' });
    } catch (err) {
        res.status(500).json({ ok: false, msg: err });
    }
};

const detalleRecomendacion = async(req = request, res = response) => {

    const { detalleItems } = req.body;
    try {
        for (let i = 0; i < detalleItems.length; i++) {
            const { numeroRecomendacion, idNumeroItem } = detalleItems[i];
            const { ventaRepository } = await MySQLConnection.getRepositories();
            const detalleRecomendacion = new AddRecomendacion({
                numeroRecomendacion,
                idNumeroItem
            });

            await ventaRepository.detalleRecomendacion(detalleRecomendacion);
        }
        res.json({ ok: true, msg: 'Detalle de recomedación registrada Correctamente' });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err });
    }
};

const addPedido = async(req = request, res = response) => {

    const { numeroOrden, fechaPedido, fechaPrometida, condiciones, 
        idVerificarDisponibilidad, idNumeroCliente, idEmpleado } = req.body;
    try {
        const { ventaRepository } = await MySQLConnection.getRepositories();
        const addPedido = new TomarOrden({
            numeroOrden,
            fechaPedido,
            fechaPrometida,
            condiciones,
            idVerificarDisponibilidad,
            idNumeroCliente,
            idEmpleado
        });
        await ventaRepository.tomarOrden(addPedido);
        res.json({ ok: true, msg: 'Pedido registrado Correctamente' });
    } catch (err) {
        res.status(500).json({ ok: false, msg: err });
    }
};

const detallePedido = async(req = request, res = response) => {

    const { detalleItems } = req.body;
    try {
        for (let i = 0; i < detalleItems.length; i++) {
            const { idNumeroOrden, idNumeroItem } = detalleItems[i];
            const { ventaRepository } = await MySQLConnection.getRepositories();
            const detallePedido = new DetallePedido({
                idNumeroOrden,
                idNumeroItem
            });

            await ventaRepository.detallePedido(detallePedido);
        }
        res.json({ ok: true, msg: 'Detalle del pedido registrado' });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err });
    }
};

const enviarItems = async(req = request, res = response) => {
    const { items } = req.body;
    try {
        for (let i = 0; i < items.length; i++) {

            const {
                importe,
                fechaEnvio,
                fechaCierre,
                numeroComprobante,
                idNumeroCliente,
                idEmpleado,
                idNumeroOrden,
                idCodigoFacturaCliente
            } = items[i];
            const { ventaRepository } = await MySQLConnection.getRepositories();
            const enviarItems = new EnvioItems({
                importe,
                fechaEnvio,
                fechaCierre,
                numeroComprobante,
                idNumeroCliente,
                idEmpleado,
                idNumeroOrden,
                idCodigoFacturaCliente
            });
            await ventaRepository.envioItems(enviarItems);
        }
        res.json({ ok: true, msg: 'Detalle de la orden registrada Correctamente' });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err });
    }
};

const detalleEnvio = async(req = request, res = response) => {

    const { detalleItems } = req.body;
    try {
        for (let i = 0; i < detalleItems.length; i++) {
            const { idEntregarProducto, idNumeroItem, cantidadEnviada, estadoEnvio, observacion } = detalleItems[i];
            const { ventaRepository } = await MySQLConnection.getRepositories();
            const detalleEnvio = new DetalleEnvio({
                idEntregarProducto,
                idNumeroItem,
                cantidadEnviada,
                estadoEnvio,
                observacion
            });

            await ventaRepository.detalleEnvio(detalleEnvio);
        }
        res.json({ ok: true, msg: 'Detalle de envio registrado' });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err });
    }
};




module.exports = {
    findAllItemsWithTasaUso,
    checkDisponibilidad,
    detalleDisponibilidad,
    addRecomendacion,
    addPedido,
    detalleRecomendacion,
    detallePedido,
    enviarItems,
    detalleEnvio
}