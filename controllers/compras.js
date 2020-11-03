const { request, response } = require('express');
const MySQLConnection = require('./../database');
const CheckCompra = require('../models/compra/check-compra');
const DetalleDisponibilidad = require('../models/compra/detalle-verificar');
const CheckDisponibilidad = require('./../models/compra/check-disponibilidad');

const findAllItemsWithState = async(req = request, res = response) => {
    try {
        const { compraRepository } = await MySQLConnection.getRepositories();
        const items = await compraRepository.findAllItemsWithState();
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
        //TODO: devolver id
        res.json({ ok: true, msg: 'Verificación registrada correctamente' });
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
        const checkDisponibilidad = new CheckCompra({
            numeroOrden,
            descripcion,
            fechaPedido,
            fechaEsperada,
            precioTotalEsperado,
            idProveedor,
            idEmpleado,
            idVerificarDisponibilidad
        });
        console.log("???|")
        await compraRepository.checkCompra(checkDisponibilidad);
        console.log('"')
            //TODO: devolver id
        res.json({ ok: true, msg: 'Orden de compra registrada correctamente' });
    } catch (err) {
        res.status(500).json({ ok: false, msg: err });
    }
};


module.exports = {
    findAllItemsWithState,
    checkDisponibilidad,
    detalleDisponibilidad,
    checkCompra
};