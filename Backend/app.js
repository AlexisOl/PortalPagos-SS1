require('dotenv').config();
const express = require('express');
const app = express();
const usuarioRoutes = require('./Routes/Usuarios.routes');
const authRoutes = require('./Routes/Auth.routes');
const empresaRoutes = require('./Routes/Empresa.routes');
const cuentasRoutes = require('./Routes/Cuenta.routes');
const transaccionesRoutes = require('./Routes/Transacciones.routes');
const reportesRoutes = require('./Routes/Reportes.routes');
const nodemon = require('nodemon')
const cors = require('cors');

const ngrok = require('ngrok');
app.use(cors({
    origin: 'http://localhost:4200', // Reemplaza esto con la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));


app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/empresa', empresaRoutes);
app.use('/api/cuenta', cuentasRoutes);
app.use('/api/transaccion', transaccionesRoutes);
app.use('/api/reportes', reportesRoutes);



app.listen(3000, () => console.log(`en http://localhost:${3000}`));