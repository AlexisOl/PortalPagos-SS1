const express = require('express');
const rutas = express.Router();
const empresaController = require('../Controllers/Empresa');
rutas.post('/crearNuevaEmpresa', empresaController.creacionEmpresa);
rutas.get('/obtenerEmpresas', empresaController.obtenerTodasEmpresas);
rutas.get('/obtenerEmpresasCodigo/:codigo', empresaController.obtenerEmpresaCodigo);

module.exports = rutas