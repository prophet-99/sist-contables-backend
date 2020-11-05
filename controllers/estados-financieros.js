const { request, response } = require('express');
const MySQLConnection = require('./../database');

const findAllGeneralLedger = async (req = request, res = response) => {
    try{
        const { estadoFinancieroRepository } = await MySQLConnection.getRepositories();
        const libroMayor = await estadoFinancieroRepository.findAllGeneralLedger();
        res.json({ ok: true, libroMayor });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

module.exports = {
    findAllGeneralLedger
};