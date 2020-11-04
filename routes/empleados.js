/**
* Route: /api/v1/empleado
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check_fields');
const { findAll, deleteById, save, findAllInactives, findAllCargos } = require('./../controllers/empleados');

const router = Router();

router.get('/', findAll);
router.get('/inactives', findAllInactives);
router.get('/cargos', findAllCargos);
router.post('/', [
    check('id', 'El id es obligatorio').notEmpty(),
    check('dni', 'El dni es obligatorio').notEmpty(),
    check('dni', 'El dni debe tener 8 dígitos').isLength({ min: 8, max: 8 }),
    check('fechaNacimiento', 'La fecha de nacimiento es obligatoria').notEmpty(),
    check('fechaContratacion', 'La fecha de contratacion es obligatoria').notEmpty(),
    check('nombres', 'Los nombres son obligatorios').notEmpty(),
    check('apellidos', 'Los apellidos es obligatorios').notEmpty(),
    check('tarifaPago', 'La tarifa de pago es obligatoria').notEmpty(),
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'El email debe ser válido').isEmail(),
    check('idCargo', 'El cargo es obligatorio').notEmpty(),
    validateFields
], save);
router.delete('/:idEmpleado', deleteById);

module.exports = router;

