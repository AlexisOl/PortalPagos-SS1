const pool = require('../Conexion/conexion');
const {
    LocalStorage
} = require('node-localstorage')
const bcrypt = require('bcrypt'); // Para encriptar y comparar contraseñas
const jwt = require('jsonwebtoken');
const axios = require('axios');
const localStorage = new LocalStorage('./scratch');
require('dotenv').config();


//funcion para crear cuentas bancarias 
creacionCuentas = async (req, res) => {
    try {
        const {
            idUsuario,
            codigo,
            pin,
            id_tipoCuentaAsociadas
        } = req.body.cuenta
        console.log(req.body.cuenta, "---");

        //verificar si esta registrado
        //generacion de transaccion 
        await pool.beginTransaction;

        const [registro] = await pool.query(
            "SELECT COUNT(*) AS cantidad FROM usuarios u WHERE u.id = ?", [idUsuario]
        );
        // despues de ver si existe, ver si no tiene algo ya registrado, sino no puede ingresar
        // algo nuevo
        const [cuentaYaRegistrada] = await pool.query(
            "SELECT * from cuentasElectronicas ce  WHERE ce.id_usuario = ?", [idUsuario]
        );
        console.log(cuentaYaRegistrada, cuentaYaRegistrada[0]);

        if (cuentaYaRegistrada.length === 0) {
            if (registro[0].cantidad === 1) {
                // ACA DEBERIA DE IR A CONSUMIR EL SERVICIO DEL BANCO
                //SI EXISTE ENTONCES LO CREO SINO NEL
                // TARJETA
                let existencia = null
                if (id_tipoCuentaAsociadas === 1) {
                    console.log(codigo, );

                    const token = localStorage.getItem('TOKEN');
                    existencia = await axios.post(
                        'http://34.42.51.137:3001/api/card', {
                            cardNumber: codigo,
                            pin: pin
                        }, {
                            headers: {
                                'Authorization': token
                            }
                        }
                    );
                    console.log(existencia.data.exist);

                    // banco
                } else {
                    const token = process.env.TOKEN_FERNANDO;
                    //     existencia = await axios.post((req, res) => {
                    //         let name = req;
                    //         console.log(name);

                    //  },
                    //          process.env.RUTA_FERNANDO+'/cuenta/verificar-saldo/3.basic@bancoazteca.com',
                    //         {
                    //             monto: 10,
                    //         },
                    //         {
                    //             headers: {
                    //                 'Authorization': "Bearer" +token 
                    //             }
                    //         }
                    // );
                    existencia = true
                }


                if (existencia) {
                    // como si existe se genera el ingreso de la cuenta bancaria

                    const idCuentaBancaria = await createOrFindByIdCuentaBancaria(codigo, pin)


                    /// en este caso me devuevle un dato y ya solo lo ingreso como cuenta
                    const [ingresoCuenta] = await pool.query(
                        `INSERT INTO cuentasElectronicas 
                        (id_codigoCuentasBancarias, id_tipoCuentaAsociadas, id_usuario, monto) 
                        VALUES (?, ?, ?, ?)`,
                        [idCuentaBancaria.id, id_tipoCuentaAsociadas, idUsuario, 0]
                    );
                    await pool.commit; // Confirma la transacción
                    res.status(200).json({
                        message: 'cuenta registrado',
                        tarjeta: ingresoCuenta
                    });
                } else {
                    await pool.rollback;
                    return res.status(400).json({
                        error: 'ya tiene registrado una tarjeta/banco  en el portal'
                    });
                }

            } else {
                await pool.rollback;
                return res.status(400).json({
                    error: 'NO EXISTE EL usuario en el portal'
                });

            }

        } else {
            await pool.rollback;
            return res.status(400).json({
                error: 'ya tiene registrado una tarjeta/banco  en el portal'
            });
        }



    } catch (error) {
        console.log(error);

        await pool.rollback;

        res.status(500).json({
            error: 'Error al crear la cuenta'
        });

    }
}

//funcion para buscar o crear 
const createOrFindByIdCuentaBancaria = async (idCuentaBancaria, pin) => {
    try {
        // Verificar si la cuenta bancaria existe
        const [resultado] = await pool.query(
            "SELECT * FROM codigoCuentasBancarias WHERE id_cuentaBancaria = ?", [idCuentaBancaria]
        );
        console.log(resultado);

        // Si la cuenta bancaria existe, devolverla
        if (resultado.length > 0) {
            return resultado[0];
        }

        const [nuevaCuenta] = await pool.query(
            "INSERT INTO codigoCuentasBancarias (id_cuentaBancaria, pin) VALUES (?, ?)",
            [idCuentaBancaria, pin]
        );

        return {
            id: nuevaCuenta.insertId, // ID de la nueva cuenta bancaria
            id_cuentaBancaria: idCuentaBancaria,
        };
    } catch (error) {
        console.error('Error en createOrFindByIdCuentaBancaria:', error);
        throw new Error('Error en la base de datos');
    }
};

//funcion para ver todas las cuentas electronicas asociadas a una cuenta bancaria



//funcion para eliminar cuentas
eliminarCuentaElectronica = async (req, res) => {
    try {
        const {
            idCuentaBancaria
        } = req.body
        await pool.beginTransaction;

        //verificar si esta registrado
        //generacion de transaccion
        const [tieneMonto] = await pool.query(
            ""
        );

        await pool.commit; // Confirma la transacción
        res.status(200).json({
            message: 'cuenta registrado',
            tarjeta: existencia.data
        });
    } catch (error) {

        await pool.rollback;

        res.status(500).json({
            error: 'Error al crear la cuenta'
        });
    }
}

ObtenerCuentasEspecificasCorreo = async (req, res) => {
    try {
        const {
            correo
        } = req.params;
        // Verificar si existe el correo
        console.log(correo);

        if (!correo) {
            return res.status(400).json({
                message: 'el correo no puede ser vacio.'
            });

        }
        const [usuario] = await pool.query(
            "SELECT * FROM usuarios u WHERE u.correo = ?", [correo]
        )
        if (usuario.length === 0) {
            return res.status(400).json({
                message: 'el correo no esta asociado a nadie'
            });

        }

        const [cuentaElectronica] = await pool.query(
            "SELECT * FROM cuentasElectronicas ce join codigoCuentasBancarias ccb on ccb.id =ce.id_codigoCuentasBancarias join tipoCuentaAsociadas tca on tca.id= ce.id_tipoCuentaAsociadas WHERE ce.id_usuario = ?", [usuario[0].id]
        );
        console.log(cuentaElectronica);

        // Si la cuenta bancaria existe, devolverla
        if (cuentaElectronica.length === 0) {
            return res.status(200).json({
                message: 'vacio',
                cuenta: []
            });

        } else {
            return res.status(200).json({
                message: 'cuenta encontrada',
                cuenta: cuentaElectronica[0]
            });

        }
    } catch (error) {
        res.status(500).json({
            error: 'Error en buscar'
        });

    }
}
module.exports = {
    creacionCuentas,
    ObtenerCuentasEspecificasCorreo
}