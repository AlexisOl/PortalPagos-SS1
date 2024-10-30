require('dotenv').config();
const express = require('express');
const app = express();
const usuarioRoutes = require('./Routes/Usuarios.routes');
const empresaRoutes = require('./Routes/Empresa.routes');
const nodemon = require('nodemon')

const ngrok = require('ngrok');


nodemon({
  script: 'app.js',
  ext: 'js json'
})

let conexionNgrok = null;


nodemon.on('start', async () => {
  if (!conexionNgrok) {
    conexionNgrok = await ngrok.connect({ port: 3000 })
    console.log(`en la direccion ${conexionNgrok}`)
  }
}).on('quit', async () => {
  await ngrok.kill()
})