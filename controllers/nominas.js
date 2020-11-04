const { request, response } = require('express');
const MySQLConnection = require('./../database');
const NominaSueldos = require('../models/nomina/nomina-sueldos');
const ObtenerTiempo = require('../models/nomina/obtener-tiempo');

const insertNominaSueldos = async (req = request, res = response) => {
    const { cantidad, fechaPago, idEmpleado, idNumeroCuenta, 
        saldoBruto, fechaNomina, idDescuento } = req.body;
    try{
        const { nominaRepository } = await MySQLConnection.getRepositories();
        const nominaSueldo = new NominaSueldos({
            cantidad, fechaPago, idEmpleado, idNumeroCuenta, 
            saldoBruto, fechaNomina, idDescuento
        });
        const idNominaSueldo = await nominaRepository.insertNominaSueldos(nominaSueldo);
        res.json({ ok: true, idNominaSueldo: idNominaSueldo[0].idNominaSueldo });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });   
    }
};

const insertObtenerTiempos = async (req = request, res = response) => {
    const { tarjetasTiempo } = req.body;
    try{
        const { nominaRepository } = await MySQLConnection.getRepositories();
        for (let i = 0; i < tarjetasTiempo.length; i++) {
            const { fechaRegistro, horaInicio, horaFin, idEmpleado,
                idNominaSueldo } = tarjetasTiempo[i];
            const obtenerTiempo = new ObtenerTiempo({
                fechaRegistro, horaInicio, horaFin, idEmpleado,
                idNominaSueldo
            });
            await nominaRepository.insertObtenerTiempos(obtenerTiempo);    
        }
        res.json({ ok: true, msg: 'Obtener tiempo insertado correctamente' });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });   
    }
};

const findAllDescuentos = async (req = request, res = response) => {
    try{
        const { nominaRepository } = await MySQLConnection.getRepositories();
        const nominas = await nominaRepository.findAllDescuentos();
        res.json({ ok: true, nominas });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

module.exports = {
    insertNominaSueldos,
    insertObtenerTiempos,
    findAllDescuentos
};