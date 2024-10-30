const pool = require('../Conexion/conexion');

creacionCuentas() = async (req, res) => {
    try {
        const { idUsuario, codigoBancario, monto } = req.body 
        // ACA DEBERIA DE IR A CONSUMIR EL SERVICIO DEL BANCO
        //SI EXISTE ENTONCES LO CREO SINO NEL
    } catch (error) {
        res.status(500).json({ error: 'Error al crear empresa' });
        
    }
}

module.exports = {

}