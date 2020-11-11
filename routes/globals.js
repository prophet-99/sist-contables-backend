const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check_fields');
const { transaccionesDesembolsarPorFecha, transaccionesRecibirPorfecha, tiempoPromedioentrega, inventarioRecomendado } = require('./../controllers/globals');

const router = Router();

router.get('/desembolsarxfecha', transaccionesDesembolsarPorFecha);
router.get('/recibirxfecha', transaccionesRecibirPorfecha);
router.get('/tiempoPromedioEntrega', tiempoPromedioentrega);
router.get('/inventarioRecomendado', inventarioRecomendado);

module.exports = router;
