const express = require('express');
const rutas = express.Router();
const cuentaController = require('../Controllers/Cuenta');
rutas.post('/crearNuevaCuenta', cuentaController.creacionCuentas);
rutas.get('/ObtenerCuentasEspecificasCorreo/:correo', cuentaController.ObtenerCuentasEspecificasCorreo);

module.exports = rutas