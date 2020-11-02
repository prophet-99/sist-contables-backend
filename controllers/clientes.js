const { request, response } = require('express');
const MySQLConnection = require('./../database');
const Cliente = require('./../models/cliente/cliente');

const findAll = async (req = request, res = response) => {
    const { search } = req.query;
    try{
        const { clienteRepository } = await MySQLConnection.getRepositories();
        const clientes = (!search) ? 
            await clienteRepository.findAll() : 
            await clienteRepository.findByNameOrDni(search);
        res.json({ ok: true, clientes });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const findAllInactives = async (req = request, res = response) => {
    const { search } = req.query;
    try{
        const { clienteRepository } = await MySQLConnection.getRepositories();
        const clientes = (!search) ? 
            await clienteRepository.findAllInactives() : 
            await clienteRepository.findByNameOrDniInactives(search);
        res.json({ ok: true, clientes });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const save = async (req = request, res = response) => {
    const {  id, dni, nombre, direccion,
        celular, numeroCuenta, creditoDisponible,
        creditoAsignado
    } = req.body;
    try{
        const { clienteRepository } = await MySQLConnection.getRepositories();
        const cliente = new Cliente({
            id, dni, nombre, direccion, celular, numeroCuenta,
            creditoDisponible, creditoAsignado
        });
        await clienteRepository.save(cliente);
        res.json({ ok: true, msg: 'Cliente registrado correctamente' });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const deleteById = async (req = request, res = response) => {
    const { idCliente } = req.params;
    try{
        const { clienteRepository } = await MySQLConnection.getRepositories();
        await clienteRepository.deleteById(idCliente);
        res.json({ ok: true, msg: 'Cliente eliminado correctamente' });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

module.exports = {
    findAll,
    findAllInactives,
    save,
    deleteById
};