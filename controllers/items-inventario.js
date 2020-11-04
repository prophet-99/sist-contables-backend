const { request, response } = require('express');
const MySQLConnection = require('./../database');
const Inventario = require('./../models/inventario/inventario');

const findAll = async (req = request, res = response) => {
    const { search } = req.query;
    try{
        const { inventarioRepository } = await MySQLConnection.getRepositories();
        const items = (!search) ? 
            await inventarioRepository.findAll() : 
            await inventarioRepository.findByCodigoOrName(search);
        res.json({ ok: true, items });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const findAllInactives = async (req = request, res = response) => {
    const { search } = req.query;
    try{
        const { inventarioRepository } = await MySQLConnection.getRepositories();
        const items = (!search) ? 
            await inventarioRepository.findAllInactives() : 
            await inventarioRepository.findByCodigoOrNameInactives(search);
        res.json({ ok: true, items });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const save = async (req = request, res = response) => {
    const { numeroItem,  descripcion, ubicacion, cantidadDiponible, 
        puntoReorden, costoUnitario, tasaUso, idCategoria, action
    } = req.body;
    try{
        const { inventarioRepository } = await MySQLConnection.getRepositories();
        const inventario = new Inventario({
            numeroItem, descripcion, ubicacion, cantidadDiponible, 
            puntoReorden, costoUnitario, tasaUso, idCategoria
        });
        await inventarioRepository.save(inventario, action);
        res.json({ ok: true, msg: 'Item del inventario registrado correctamente' });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const deleteById = async (req = request, res = response) => {
    const { idInventario } = req.params;
    try{
        const { inventarioRepository } = await MySQLConnection.getRepositories();
        await inventarioRepository.deleteById(idInventario);
        res.json({ ok: true, msg: 'Item del inventario eliminado correctamente' });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const findAllCategorias = async (req = request, res = response) => {
    try{
        const { inventarioRepository } = await MySQLConnection.getRepositories();
        const categorias = await inventarioRepository.findAllCategorias();
        res.json({ ok: true, categorias });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

module.exports = {
    findAll,
    findAllInactives,
    save,
    deleteById,
    findAllCategorias
};