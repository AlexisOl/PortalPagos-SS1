const express = require('express');
const app = express();
const usuarioRoutes = require('./Routes/Usuarios.routes');
// Importar otras rutas aquí

 app.use(express.json());
 app.use('/api/usuarios', usuarioRoutes);
// Agrega más rutas aquí

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
