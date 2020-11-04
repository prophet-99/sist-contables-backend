/**
* Route: /api/v1/proveedor
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check_fields');
const { findAll, deleteById, save, findAllInactives, findAllPlazos } = require('./../controllers/proveedores');

const router = Router();

router.get('/', findAll);
router.get('/inactives', findAllInactives);
router.get('/plazos', findAllPlazos);
router.post('/', [
    check('id', 'El id es obligatorio').notEmpty(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('direccion', 'La dirección es obligatoria').notEmpty(),
    check('ruc', 'El ruc es obligatorio').notEmpty(),
    check('ruc', 'El ruc debe tener 11 dígitos').isLength({ min: 11, max: 11 }),
    check('numeroCuenta', 'El numero de cuenta es obligatorio').notEmpty(),
    check('numeroEnviosFallados', 'El número de envios fallidos es obligatorio').notEmpty(),
    check('numeroEnviosIncompletos', 'El número de envios incompletos es obligatorio').notEmpty(),
    check('idPlazoEntrega', 'El id de plazo de entrega es obligatorio').notEmpty(),
    validateFields
], save);
router.delete('/:idProveedor', deleteById);

module.exports = router;