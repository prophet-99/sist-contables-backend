const express = require('express');
const { baseAPI } = require('./../config');

const app = express();

app.use(`${ baseAPI }/usuario`, require('./usuarios'));
app.use(`${ baseAPI }/login`, require('./auth'));
app.use(`${ baseAPI }/empleado`, require('./empleados'));
app.use(`${ baseAPI }/cliente`, require('./clientes'));
app.use(`${ baseAPI }/proveedor`, require('./proveedores'));
app.use(`${ baseAPI }/inventario/items`, require('./itemsInventario'));

module.exports = app;
