/**
 * Route: /api/v1/compra
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check_fields');
const { findAllItemsWithState, checkDisponibilidad, detalleDisponibilidad, checkCompra } = require('./../controllers/compras');

const router = Router();

router.get('/itemsestado', findAllItemsWithState);
router.post('/verificardisponibilidad', [
    check('hora').notEmpty(),
    check('fecha').notEmpty(),
    check('idEmpleado').notEmpty(),
    validateFields
], checkDisponibilidad);
router.post('/detalledisponibilidad', [
    check('detalleItems').notEmpty(),
    validateFields
], detalleDisponibilidad);
router.post('/registrarcompra', [
    check('numeroOrden').notEmpty(),
    check('descripcion').notEmpty(),
    check('fechaPedido').notEmpty(),
    check('fechaEsperada').notEmpty(),
    check('precioTotalEsperado').notEmpty(),
    check('idProveedor').notEmpty(),
    check('idEmpleado').notEmpty(),
    check('idVerificarDisponibilidad').notEmpty(),
    validateFields
], checkCompra);


module.exports = router;