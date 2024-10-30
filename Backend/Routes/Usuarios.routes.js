const express = require('express');
const rutas = express.Router();
const usuarioController = require('../Controllers/Usuario');
rutas.get('/todosUsuarios', usuarioController.getUsuariosPorEstado);
rutas.get('/todosTipoUsuarios', usuarioController.getTiposUsuario);
rutas.post('/registroUsuarios', usuarioController.registroUsuarios);

module.exports = rutas