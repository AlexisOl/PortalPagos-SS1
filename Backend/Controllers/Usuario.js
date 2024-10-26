const pool = require('../Conexion/conexion');

// Obtener usuarios por estado
getUsuariosPorEstado = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM usuarios'
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

//obtener tipos de usuario
getTiposUsuario = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM tipoUsuario'
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tipoUsuario' });
    }
};



module.exports = {
    getUsuariosPorEstado: getUsuariosPorEstado,
    getTiposUsuario: getTiposUsuario
}