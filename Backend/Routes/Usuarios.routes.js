const express = require('express');
const rutas = express.Router();
const usuarioController = require('../Controllers/Usuario');
rutas.get('/todosUsuarios', usuarioController.getUsuariosPorEstado);
rutas.get('/todosTipoUsuarios', usuarioController.getTiposUsuario);

module.exports = rutas