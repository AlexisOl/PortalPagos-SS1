const express = require('express');
const rutas = express.Router();
const empresaController = require('../Controllers/Empresa');
rutas.post('/crearNuevaEmpresa', empresaController.creacionEmpresa);

module.exports = rutas