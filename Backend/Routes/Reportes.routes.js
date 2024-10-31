const express = require('express');
const rutas = express.Router();
const reportesController = require('../Controllers/Reportes');
rutas.get('/reporteErroresTransacciones', reportesController.reporteErroresTransacciones);
rutas.get('/reporteGananciasGenerales/:fecha', reportesController.reporteGananciasGenerales);
rutas.get('/reporteHistoricoMovimientosUsuario/:idUsuario', reportesController.reporteHistoricoMovimientosUsuario);
rutas.get('/reporteIngresosEgresos/:fecha', reportesController.reporteIngresosEgresos);
rutas.get('/reporteUsuariosPorEstado', reportesController.reporteUsuariosPorEstado);


module.exports = rutas