/**
 * Route: /api/v1/compra
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check_fields');
const { 
    findAllItemsWithState, checkDisponibilidad, detalleDisponibilidad, 
    checkCompra, detalleOrden, recibirItems, detalleRecepcion, 
    findAllOrdenesCompra, findAllDetalleOrdenesCompra, insertFactura, 
    desembolsarEfectivo
} = require('./../controllers/compras');

const router = Router();

router.get('/itemsestado', findAllItemsWithState);
router.get('/ordencompra', findAllOrdenesCompra);
router.post('/detalleordencompra', [
    check('idOrdenCompra'),
    validateFields
], findAllDetalleOrdenesCompra);
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

router.post('/detalleorden', [
    check('ordenarItems').notEmpty(),
    validateFields
], detalleOrden);

router.post('/factura', [
    check('idFactura').notEmpty(),
    validateFields
], insertFactura);

router.post('/recibiritems', [
    check('numeroComprobante').notEmpty(),
    check('fechaRecepcion').notEmpty(),
    check('transportista').notEmpty(),
    check('numeroReciboInventario').notEmpty(),
    check('montoAdeuda').notEmpty(),
    check('idProveedor').notEmpty(),
    check('idEmpleado').notEmpty(),
    check('idNumeroOrdenCompra').notEmpty(),
    check('idCodigoFactura').notEmpty(),
    validateFields
], recibirItems);

router.post('/detallerecibir', [
    check('detalleItems').notEmpty(),
    validateFields
], detalleRecepcion);

router.post('/desembolsarefectivo', [
    check('monto').notEmpty(),
    check('fecha').notEmpty(),
    check('idEmpleado').notEmpty(),
    check('idNumeroCuenta').notEmpty(),
    check('idNumeroOrdenCompra').notEmpty(),
    check('idCodigoFactura').notEmpty(),
    check('idProveedor').notEmpty(),
    validateFields
], desembolsarEfectivo);


module.exports = router;
            
            
            
            
            
            
            