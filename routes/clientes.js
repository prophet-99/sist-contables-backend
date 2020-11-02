/**
* Route: /api/v1/cliente
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check_fields');
const { findAll, deleteById, save, findAllInactives } = require('./../controllers/clientes');

const router = Router();

router.get('/', findAll);
router.get('/inactives', findAllInactives);
router.post('/', [
    check('id', 'El id es obligatorio').notEmpty(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('direccion', 'La dirección es obligatoria').notEmpty(),
    check('dni', 'El dni es obligatorio').notEmpty(),
    check('dni', 'El dni debe tener 8 dígitos').isLength({ min: 8, max: 8 }),
    check('numeroCuenta', 'El numero de cuenta es obligatorio').notEmpty(),
    check('creditoDisponible', 'El crédito disponible es obligatorio').notEmpty(),
    check('creditoAsignado', 'El crédito asginado es obligatorio').notEmpty(),
    validateFields
], save);
router.delete('/:idCliente', deleteById);

module.exports = router;