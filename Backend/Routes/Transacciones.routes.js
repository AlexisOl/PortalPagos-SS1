const express = require('express');
const rutas = express.Router();
const transaccionesController = require('../Controllers/Transacciones');
rutas.post('/generarTransaccion', transaccionesController.creacionTransaccion);
rutas.get('/ListadoTransacciones', transaccionesController.TodasTransacciones);
//rutas.post('/ObtenerCuentasEspecificasId/:id', cuentaController.creacionEmpresa);

module.exports = rutas