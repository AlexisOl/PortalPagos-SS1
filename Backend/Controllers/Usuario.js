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

//registro para usuarios

registroUsuarios = async (req, res) => {
    // obtiene los datos
    const { nombre, id_empresa } = req.body;
    try {
        //comienza transaccion
        await pool.beginTransaction;
        const [tipoCorrecto] = await pool.query(
            "select count(*) as cantidad from empresa e where e.id_empresa = ?", [id_empresa]
        )
        if (tipoCorrecto[0].cantidad==1) {
            const [result] = await pool.query(
            'INSERT INTO usuarios (nombreUsuario, id_tipo, id_empresa) VALUES (?, ?, ?)',
            [nombre, 2, id_empresa]
        );
        }
        

        await pool.commit
        res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
        console.log(error);
        
         await pool.rollback;
       res.status(500).json({ error: 'Error al registrar usuario' });
   }
}



registroLoginUsuarios = async (req, res) => {
    try {
    // ir a buscar si existe en el otro servicio

    // si existe la creamos

    // luego al usuario 

    } catch (error) {
       res.status(500).json({ error: 'Error al registrar usuario' });
        
    }

}


module.exports = {
    getUsuariosPorEstado: getUsuariosPorEstado,
    getTiposUsuario: getTiposUsuario,
    registroUsuarios: registroUsuarios,
    registroLoginUsuarios: registroLoginUsuarios
}