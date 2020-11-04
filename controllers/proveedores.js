const { request, response } = require('express');
const MySQLConnection = require('./../database');
const Proveedor = require('./../models/proveedor/proveedor');

const findAll = async (req = request, res = response) => {
    const { search } = req.query;
    try{
        const { proveedorRepository } = await MySQLConnection.getRepositories();
        const proveedores = (!search) ? 
            await proveedorRepository.findAll() : 
            await proveedorRepository.findByNameOrRuc(search);
        res.json({ ok: true, proveedores });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const findAllInactives = async (req = request, res = response) => {
    const { search } = req.query;
    try{
        const { proveedorRepository } = await MySQLConnection.getRepositories();
        const proveedores = (!search) ? 
            await proveedorRepository.findAllInactives() : 
            await proveedorRepository.findByNameOrRucInactives(search);
        res.json({ ok: true, proveedores });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const save = async (req = request, res = response) => {
    const { id, nombre, direccion, ruc, numeroCuenta, 
        numeroEnviosFallados, numeroEnviosIncompletos, 
        observacionesComerciales, idPlazoEntrega
    } = req.body;
    try{
        const { proveedorRepository } = await MySQLConnection.getRepositories();
        const proveedor = new Proveedor({
            id, nombre, direccion, ruc, numeroCuenta, numeroEnviosFallados,
            numeroEnviosIncompletos, observacionesComerciales, idPlazoEntrega
        });
        await proveedorRepository.save(proveedor);
        res.json({ ok: true, msg: 'Proveedor registrado correctamente' });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const deleteById = async (req = request, res = response) => {
    const { idProveedor } = req.params;
    try{
        const { proveedorRepository } = await MySQLConnection.getRepositories();
        await proveedorRepository.deleteById(idProveedor);
        res.json({ ok: true, msg: 'Proveedor eliminado correctamente' });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const getAllPlazos = async (req = request, res = response) => {
    try{
        const { proveedorRepository } = await MySQLConnection.getRepositories();
        const plazos = await proveedorRepository.getPlazosEntrega() 
        
        res.json({ ok: true, plazos });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

module.exports = {
    findAll,
    findAllInactives,
    save,
    deleteById,
    getAllPlazos
};