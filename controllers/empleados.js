const { request, response } = require('express');
const MySQLConnection = require('./../database');
const Empleado = require('./../models/empleado/empleado');

const findAll = async (req = request, res = response) => {
    const { search } = req.query;
    try{
        const { empleadoRepository } = await MySQLConnection.getRepositories();
        const empleados = (!search) ? 
            await empleadoRepository.findAll() : 
            await empleadoRepository.findByNameOrSurname(search);
        res.json({ ok: true, empleados });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const findAllInactives = async (req = request, res = response) => {
    const { search } = req.query;
    try{
        const { empleadoRepository } = await MySQLConnection.getRepositories();
        const empleados = (!search) ? 
            await empleadoRepository.findAllInactives() : 
            await empleadoRepository.findByNameOrSurnameInactives(search);
        res.json({ ok: true, empleados });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const save = async (req = request, res = response) => {
    const { id, dni, fechaNacimiento, fechaContratacion, nombres, 
        apellidos, tarifaPago, email, idCargo } = req.body;
    try{
        const { empleadoRepository } = await MySQLConnection.getRepositories();
        const empleado = new Empleado({
            id, dni, fechaContratacion, fechaNacimiento, nombres,
            apellidos, tarifaPago, email, idCargo
        });
        await empleadoRepository.save(empleado);
        res.json({ ok: true, msg: 'Empleado registrado correctamente' });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const deleteById = async (req = request, res = response) => {
    const { idEmpleado } = req.params;
    try{
        const { empleadoRepository } = await MySQLConnection.getRepositories();
        await empleadoRepository.deleteById(idEmpleado);
        res.json({ ok: true, msg: 'Empleado eliminado correctamente' });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

const findAllCargos = async (req = request, res = response) => {
    try{
        const { empleadoRepository } = await MySQLConnection.getRepositories();
        const cargos = await empleadoRepository.findAllCargos();
        res.json({ ok: true, cargos });
    }catch(err){
        res.status(500).json({ ok: false, msg: err });
    }
};

module.exports = {
    findAll,
    findAllInactives,
    save,
    deleteById,
    findAllCargos
};