const pool = require('../Conexion/conexion');


creacionEmpresa = async (req, res) => {
    const { nombre_empresa, codigo_empresa } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO empresa (nombre_empresa, codigo_empresa) VALUES (?, ?)',
            [nombre_empresa, codigo_empresa]
        );
        res.status(201).json({ message: 'Empresa creada', id_empresa: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear empresa' });
    }
}



module.exports = {
    creacionEmpresa
}