const { request, response } = require('express');
const MySQLConnection = require('./../database');
const CheckCompra = require('../models/compra/check-compra');
const DetalleDisponibilidad = require('../models/compra/detalle-verificar');
const CheckDisponibilidad = require('./../models/compra/check-disponibilidad');
const DetalleOrden = require('./../models/compra/detalle-orden');
const RecibirItems = require('../models/compra/recibir-items');
const DetalleRecepcion = require('../models/compra/detalle-recepcion');
const DesembolsoEfectivo = require('../models/compra/desembolso-efectivo');

const findAllItemsWithState = async(req = request, res = response) => {
    try {
        const { compraRepository } = await MySQLConnection.getRepositories();
        const items = await compraRepository.findAllItemsWithState();
        res.json({ ok: true, items });
    } catch (err) {
        res.status(500).json({ ok: false, msg: err });
    }
};

const findAllItemsWithStateFixeds = async(req = request, res = response) => {
    try {
        const { compraRepository } = await MySQLConnection.getRepositories();
        const items = await compraRepository.findAllItemsWithStateFixeds();
        res.json({ ok: true, items });
    } catch (err) {
        res.status(500).json({ ok: false, msg: err });
    }
};

const checkDisponibilidad = async(req = request, res = response) => {

    const { hora, fecha, idEmpleado } = req.body;
    try {
        const { compraRepository } = await MySQLConnection.getRepositories();
        const checkDisponibilidad = new CheckDisponibilidad({
            hora,
            fecha,
            idEmpleado
        });
        await compraRepository.checkDisponibilidad(checkDisponibilidad);
        const idVerificar = await compraRepository.getIdVerificar();
        res.json({ ok: true, idVerificar: idVerificar[0].id });
    } catch (err) {
        res.status(500).json({ ok: false, msg: err });
    }
};

const detalleDisponibilidad = async(req = request, res = response) => {

    const { detalleItems } = req.body;
    try {
        for (let i = 0; i < detalleItems.length; i++) {
            const { idNumeroItem, idVerificarDisponibilidad, descripcion, reorden, cantidadSolicitada } = detalleItems[i];
            const { compraRepository } = await MySQLConnection.getRepositories();
            const detalleDisponibilidad = new DetalleDisponibilidad({
                idNumeroItem,
                idVerificarDisponibilidad,
                descripcion,
                reorden,
                cantidadSolicitada
            });

            await compraRepository.detalleDisponibilidad(detalleDisponibilidad);
        }
        res.json({ ok: true, msg: 'Detalle de verificación registrada Correctamente' });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err });
    }
};

const checkCompra = async(req = request, res = response) => {
    const {
        numeroOrden,
        descripcion,
        fechaPedido,
        fechaEsperada,
        precioTotalEsperado,
        idProveedor,
        idEmpleado,
        idVerificarDisponibilidad
    } = req.body;
    try {
        const { compraRepository } = await MySQLConnection.getRepositories();
        const checkCompra = new CheckCompra({
            numeroOrden,
            descripcion,
            fechaPedido,
            fechaEsperada,
            precioTotalEsperado,
            idProveedor,
            idEmpleado,
            idVerificarDisponibilidad
        });
        await compraRepository.checkCompra(checkCompra);
        res.json({
            ok: true,
            msg: 'Orden de compra registrada Correctamente'
        });
    } catch (err) {
        res.status(500).json({ ok: false, msg: err });
    }
};
const detalleOrden = async(req = request, res = response) => {

    const { ordenarItems } = req.body;
    try {
        for (let i = 0; i < ordenarItems.length; i++) {
            const { idNumeroItem, idNumeroOrdenCompra, cantidad, precioUnitarioCompra } = ordenarItems[i];
            const { compraRepository } = await MySQLConnection.getRepositories();
            const detalleOrden = new DetalleOrden({
                idNumeroItem,
                idNumeroOrdenCompra,
                cantidad,
                precioUnitarioCompra
            });
            await compraRepository.detalleOrden(detalleOrden);
        }
        res.json({ ok: true, msg: 'Detalle de la orden registrada Correctamente' });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err });
    }
};

const insertFactura = async(req = request, res = response) => {
    const { idFactura } = req.body;
    try {
        const { compraRepository } = await MySQLConnection.getRepositories();
        await compraRepository.insertFactura(idFactura);
        res.json({
            ok: true,
            msg: 'Factura registrada Correctamente'
        });
    } catch (err) {
        res.status(500).json({ ok: false, msg: err });
    }
};

const recibirItems = async(req = request, res = response) => {
    const {
        numeroComprobante,
        fechaRecepcion,
        montoAdeuda,
        transportista,
        numeroReciboInventario,
        idProveedor,
        idEmpleado,
        idNumeroOrdenCompra,
        idCodigoFactura
    } = req.body;
    try {
        const { compraRepository } = await MySQLConnection.getRepositories();
        const recibirItems = new RecibirItems({
            numeroComprobante,
            fechaRecepcion,
            montoAdeuda,
            transportista,
            numeroReciboInventario,
            idProveedor,
            idEmpleado,
            idNumeroOrdenCompra,
            idCodigoFactura
        });
        await compraRepository.recibirItems(recibirItems);
        
        res.json({ ok: true, msg: 'Detalle de la recepcion registrada Correctamente' });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err });
    }
};

const detalleRecepcion = async(req = request, res = response) => {

    const { detalleItems } = req.body;
    try {
        for (let i = 0; i < detalleItems.length; i++) {
            const { idNumeroItem, idNumeroComprobante, cantidadRecibida, costoUnitarioActual, estado_recepcion, observacion } = detalleItems[i];
            const { compraRepository } = await MySQLConnection.getRepositories();
            const detalleRecepcion = new DetalleRecepcion({
                idNumeroItem,
                idNumeroComprobante,
                cantidadRecibida,
                costoUnitarioActual,
                estado_recepcion,
                observacion
            });
            await compraRepository.detalleRecepcion(detalleRecepcion);
        }
        res.json({ ok: true, msg: 'Detalle de la recepción registrada Correctamente' });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err });
    }
};

const findAllOrdenesCompra = async(req = request, res = response) => {
    const { ordencompra } = req.query;
    try {
        const { compraRepository } = await MySQLConnection.getRepositories();
        const items = (!ordencompra) ?
            await compraRepository.findAllOrdenesCompra() :
            await compraRepository.findAllOrdenesCompraByCodigo(ordencompra);
        res.json({ ok: true, items });
    } catch (err) {
        res.status(500).json({ ok: false, msg: err });
    }
};

const findAllDetalleOrdenesCompra = async(req = request, res = response) => {
    const { idOrdenCompra } = req.body;
    try {
        const { compraRepository } = await MySQLConnection.getRepositories();
        const items = await compraRepository.findAllDetalleOrdenesCompra(idOrdenCompra);
        res.json({ ok: true, items });
    } catch (err) {
        res.status(500).json({ ok: false, msg: err });
    }
};

const desembolsarEfectivo = async(req = request, res = response) => {
    const { monto, fecha, idEmpleado, idNumeroCuenta, idNumeroOrdenCompra, 
        idCodigoFactura, idProveedor } = req.body;
    try {
        const { compraRepository } = await MySQLConnection.getRepositories();
        const desembolsoEfectivo = new DesembolsoEfectivo({
            monto,
            fecha,
            idEmpleado,
            idNumeroCuenta,
            idNumeroOrdenCompra,
            idCodigoFactura,
            idProveedor
        });
        await compraRepository.desembolsarEfectivo(desembolsoEfectivo);
        res.json({ ok: true, msg: 'Desembolso realizado correctamente' });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err });
    }
};

module.exports = {
    findAllItemsWithState,
    checkDisponibilidad,
    detalleDisponibilidad,
    checkCompra,
    detalleOrden,
    insertFactura,
    recibirItems,
    detalleRecepcion,
    desembolsarEfectivo,
    findAllOrdenesCompra,
    findAllDetalleOrdenesCompra,
    findAllItemsWithStateFixeds
}