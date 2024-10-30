const express = require('express');
const rutas = express.Router();
const usuarioController = require('../Controllers/Usuario');
rutas.get('/todosUsuarios', usuarioController.getUsuariosPorEstado);
rutas.get('/todosTipoUsuarios', usuarioController.getTiposUsuario);
rutas.post('/registroUsuarios', usuarioController.registroUsuarios);
rutas.post('/registroUsuariosLogin', usuarioController.registroLoginUsuarios);
rutas.post('/login', usuarioController.login);

module.exports = rutas