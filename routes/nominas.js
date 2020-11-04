/**
 * Route: /api/v1/nomina
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/check_fields');
const { insertNominaSueldos, insertObtenerTiempos, findAllDescuentos } = require('../controllers/nominas');

const router = Router();

router.get('/descuentos', findAllDescuentos);
router.post('/nominasueldos', [
    check('cantidad', 'La cantidad es obligatoria').notEmpty(),
    check('fechaPago', 'La fecha de pago es obligatoria').notEmpty(),
    check('idEmpleado', 'El empleado es obligatorio').notEmpty(),
    check('idNumeroCuenta', 'El numeroCuenta es obligatorio').notEmpty(),
    check('saldoBruto', 'El saldo bruto es obligatorio').notEmpty(),
    check('fechaNomina', 'El fecha de nomina es obligatorio').notEmpty(),
    check('idDescuento', 'El id de descuento es obligatorio').notEmpty(),
    validateFields
], insertNominaSueldos);
router.post('/obtenertiempos', [
    check('tarjetasTiempo', 'Las tarjetas de tiempo son obligatorios').notEmpty(),    
    validateFields
], insertObtenerTiempos);

module.exports = router;