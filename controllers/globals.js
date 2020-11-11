const { request, response } = require('express');
const MySQLConnection = require('./../database');

const transaccionesDesembolsarPorFecha = async (req = request, res = response) => {
    const { fecha } = req.query;
    try{
        const { globalRepository } = await MySQLConnection.getRepositories();
        const desembolso = await globalRepository.transaccionesDesembolsarPorFecha(fecha)
        res.json({ ok: true, desembolso });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const transaccionesRecibirPorfecha = async (req = request, res = response) => {
    const { fecha } = req.query;
    try{
        const { globalRepository } = await MySQLConnection.getRepositories();
        const recibir = await globalRepository.transaccionesRecibirPorFecha(fecha)
        res.json({ ok: true, recibir });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const tiempoPromedioentrega = async (req = request, res = response) => {
    try{
        const { globalRepository } = await MySQLConnection.getRepositories();
        const promedio = await globalRepository.tiempoPromedioEntrega()
        res.json({ ok: true, promedio });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const inventarioRecomendado = async (req = request, res = response) => {
    try{
        const { globalRepository } = await MySQLConnection.getRepositories();
        const item = await globalRepository.inventarioRecomendado()
        res.json({ ok: true, item });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

module.exports = {
    transaccionesDesembolsarPorFecha,
    transaccionesRecibirPorfecha,
    tiempoPromedioentrega,
    inventarioRecomendado,
};