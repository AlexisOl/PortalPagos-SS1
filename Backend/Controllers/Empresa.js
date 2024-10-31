const pool = require('../Conexion/conexion');


creacionEmpresa = async (req, res) => {
    const { nombre_empresa, codigo_empresa } = req.body;
    try {
        await pool.beginTransaction;
        
        const [result] = await pool.query(
            'INSERT INTO empresa (nombre_empresa, codigo_empresa) VALUES (?, ?)',
            [nombre_empresa, codigo_empresa]
        );
// despues de crear la empresa se le debera de asociar un usuario y una cuenta 

        await pool.commit; // Confirma la transacción

        res.status(201).json({ message: 'Empresa creada', id_empresa: result.insertId });
    } catch (error) {
        await pool.rollback; 

        res.status(500).json({ error: 'Error al crear empresa' });
    }
}

obtenerTodasEmpresas = async (req, res) => {
  try {
        const [result] = await pool.query(
            'SELECT * from empresa',
        );
        res.status(201).json({ message: 'Todas las empresas', empresas: result });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear empresa' });
    }    
}
obtenerEmpresaCodigo = async (req, res) => {
    try {
    const { codigo } = req.params;

        const [valores] = await pool.query(
            "Select * from empresa WHERE codigo_empresa =  ?", [codigo]
        )

        if (valores) {
            res.status(200).json({ message: 'empresa encontrada' , empresa: valores});
            
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}


module.exports = {
    creacionEmpresa,
    obtenerTodasEmpresas,
    obtenerEmpresaCodigo
}