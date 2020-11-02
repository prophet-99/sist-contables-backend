/**
* Route: /api/v1/usuario
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check_fields');
const { save } = require('./../controllers/usuarios');

const router = Router();

router.post('/', [
    check('idUsuario', 'El idUsuario es obligatorio').notEmpty(),
    check('username', 'El username es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    check('idCargo', 'El idCargo es obligatorio').notEmpty(),
    check('idEmpleado', 'El idEmpleado es obligatorio').notEmpty(),
    validateFields
], save);

module.exports = router;

