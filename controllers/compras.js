const { request, response } = require('express');
const MySQLConnection = require('./../database');
const CheckDisponibilidad = require('./../models/compra/check-disponibilidad');

const findAllItemsWithState = async (req = request, res = response) => {
    try{
        const { compraRepository } = await MySQLConnection.getRepositories();
        const items = await compraRepository.findAllItemsWithState();
        res.json({ ok: true, items });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const checkDisponibilidad = async (req = request, res = response) => {
    const { hora, fecha, idEmpleado } = req.body;
    try{
        const { compraRepository } = await MySQLConnection.getRepositories();
        const checkDisponibilidad = new CheckDisponibilidad({ 
            hora, fecha, idEmpleado
        });
        await compraRepository.checkDisponibilidad(checkDisponibilidad);
        res.json({ ok: true, msg: 'Verificación registrada correctamente' });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

module.exports = {
    findAllItemsWithState,
    checkDisponibilidad
};