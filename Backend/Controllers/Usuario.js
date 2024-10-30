const pool = require('../Conexion/conexion');
const { LocalStorage } = require('node-localstorage')
const bcrypt = require('bcrypt'); // Para encriptar y comparar contraseñas
const jwt = require('jsonwebtoken');
const axios = require('axios');
const localStorage = new LocalStorage('./scratch'); 

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
    const { nombre, id_empresa, password } = req.body;
    try {
        // Comienza transacción
        await pool.beginTransaction;

        // Verifica si la empresa existe
        const [tipoCorrecto] = await pool.query(
            "SELECT COUNT(*) AS cantidad FROM empresa e WHERE e.id_empresa = ?", [id_empresa]
        );

        if (tipoCorrecto[0].cantidad === 1) {
            // Encripta la contraseña
            const hashedPassword = await bcrypt.hash(password, 10); 

            const [result] = await pool.query(
                'INSERT INTO usuarios (nombreUsuario, contrasenia, id_tipo, id_empresa) VALUES (?, ?, ?, ?)',
                [nombre, hashedPassword, 2, id_empresa]
            );

            // Si la inserción es exitosa
            await pool.commit; // Confirma la transacción
            return res.status(201).json({ message: 'Usuario registrado' });
        } else {
            // Si la empresa no existe, rollback la transacción
            await pool.rollback;
            return res.status(400).json({ error: 'ID de empresa no válido' });
        }
    } catch (error) {
        console.log(error);
        await pool.rollback; 
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};



registroLoginUsuarios = async (req, res) => {
         const { cardNumber, pin } = req.body

    try {
    // ir a buscar si existe en el otro servicio
        // para ello jalar el valor del localstorage
        const token = localStorage.getItem('TOKEN');

         const existencia = await axios.post(
        'http://34.42.51.137:3001/api/card',
        {
            cardNumber: cardNumber,
            pin: pin
        },
        {
            headers: {
                'Authorization': token 
            }
        }
    );

        console.log('existencia:', existencia.data);

        
    // si existe la creamos

    // luego al usuario 
        res.status(200).json({ message: 'Usuario registrado' , tarjeta: existencia.data});

    } catch (error) {
        console.log(error);
        
       res.status(500).json({ error: 'Error al registrar usuario' });
        
    }

}

//funcion de login
login = async (req, res) => {
    try {
        const { nombreUsuario, contrasenia } = req.body;

        if (!nombreUsuario || !contrasenia) {
            return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos' });
        }
        //busca al usuario
        const [[usuario]] = await pool.query('SELECT * FROM usuarios WHERE nombreUsuario = ?', [nombreUsuario]);
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const contraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
        if (!contraseniaValida) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: usuario.id, nombreUsuario: usuario.nombreUsuario }, 'tu_secreto_jwt', {
            expiresIn: '1h', // Token expirará en 1 hora
        });

        // Responder con el token 
        res.json({
            mensaje: 'Login exitoso',
            token,
            usuario: {
                id: usuario.id,
                nombreUsuario: usuario.nombreUsuario,
                id_tipo: usuario.id_tipo,
                id_empresa: usuario.id_empresa
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};



module.exports = {
    getUsuariosPorEstado: getUsuariosPorEstado,
    getTiposUsuario: getTiposUsuario,
    registroUsuarios: registroUsuarios,
    registroLoginUsuarios: registroLoginUsuarios,
    login
}