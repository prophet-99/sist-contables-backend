/**
* Route: /api/v1/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/check_fields');
const { login } = require('./../controllers/auth');

const router = Router();

router.post('/', [
    check('username', 'El username es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    validateFields
], login);

module.exports = router;

