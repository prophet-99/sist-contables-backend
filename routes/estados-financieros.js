/**
* Route: /api/v1/estadofinanciero
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check_fields');
const { findAllGeneralLedger } = require('./../controllers/estados-financieros');

const router = Router();

router.get('/libromayor', findAllGeneralLedger);

module.exports = router;