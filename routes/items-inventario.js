/**
 * Route: /api/v1/inventario/items
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check_fields');
const { findAll, findAllActivos, deleteById, save, findAllInactives, findAllCategorias } = require('./../controllers/items-inventario');

const router = Router();

router.get('/', findAll);
router.get('/activosfijos', findAllActivos);
router.get('/inactives', findAllInactives);
router.get('/categorias', findAllCategorias);
router.post('/', [
    check('numeroItem', 'El numeroItem es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatoria').notEmpty(),
    check('ubicacion', 'La ubicacion es obligatoria').notEmpty(),
    check('cantidadDiponible', 'La cantidad disponible es obligatoria').notEmpty(),
    check('puntoReorden', 'El punto de reorden es obligatorio').notEmpty(),
    check('costoUnitario', 'El costo unitario es obligatorio').notEmpty(),
    check('tasaUso', 'La tasa de uso es obligatoria').notEmpty(),
    check('idCategoria', 'El id de la categoría es obligatorio').notEmpty(),
    check('action', 'La acción es obligatoria').notEmpty(),
    validateFields
], save);
router.delete('/:idInventario', deleteById);

module.exports = router;