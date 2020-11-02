/**
* Route: /api/v1/compra
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check_fields');
const { findAllItemsWithState, checkDisponibilidad } = require('./../controllers/compras');

const router = Router();

router.get('/itemsestado', findAllItemsWithState);
router.post('/verificardisponibilidad', [
    check('hora').notEmpty(),
    check('fecha').notEmpty(),
    check('idEmpleado').notEmpty(),
    validateFields
], checkDisponibilidad);

module.exports = router;