/**
 * Route: /api/v1/venta
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check_fields');
const {
    findAllItemsWithTasaUso,
    checkDisponibilidad,
    detalleDisponibilidad,
    addRecomendacion,
    detalleRecomendacion,
    addPedido,
    detallePedido,
    enviarItems,
    detalleEnvio,
} = require('./../controllers/ventas');

const router = Router();

router.get('/itemsestado', findAllItemsWithTasaUso);
router.get('/disponibilidad', checkDisponibilidad);

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
router.post('/addrecomendacion', [
    check('numeroRecomendacion').notEmpty(),
    check('descripcion').notEmpty(),
    check('idVerificarDisponibilidad').notEmpty(),
    check('idNumeroCliente').notEmpty(),
    validateFields
], addRecomendacion);
router.post('/detallerecomendacion', [
    check('detalleItems').notEmpty(),
    validateFields
], detalleRecomendacion);
router.post('/addpedido', [
    check('numeroOrden').notEmpty(),
    check('fechaPedido').notEmpty(),
    check('fechaPrometida').notEmpty(),
    check('condiciones').notEmpty(),
    check('idVerificarDisponibilidad').notEmpty(),
    check('idNumeroCliente').notEmpty(),
    check('idEmpleado').notEmpty(),
    validateFields
], addPedido);
router.post('/detallepedido', [
    check('detalleItems').notEmpty(),
    validateFields
], detallePedido);
router.post('/enviaritems', [
    check('items').notEmpty(),
    validateFields
], enviarItems);
router.post('/detalleenvio', [
    check('items').notEmpty(),
    validateFields
], detalleEnvio);



module.exports = router;