const express = require('express');
const rutas = express.Router();
const AutenticacionController = require('../Controllers/Autenticacion');

rutas.post('/login', AutenticacionController.login);

module.exports = rutas