const pool = require('../Conexion/conexion');
const metodoPagoTarjeta = require('../utils/MetodoPago');

creacionTransaccion = async (req, res) => {
    try {
        await pool.beginTransaction;
        const {
            correo,
            monto
        } = req.body
        // ACA DEBERIA DE IR A CONSUMIR EL SERVICIO DEL BANCO
        //SI EXISTE ENTONCES LO CREO SINO NEL

        // Validar campos
        if (!correo || !monto) {
            return res.status(400).json({
                message: 'Se necesitan datos.'
            });
        }

        const [empresa] = await pool.query(
            "SELECT * from usuarios u  WHERE u.correo = ?", [correo]
        );
        console.log(empresa[0].id_empresa);

        const [cuentaEmpresa] = await pool.query(
            "SELECT * FROM usuarios u WHERE u.id_empresa = ? AND u.id_tipo = ?", [empresa[0].id_empresa, 3]
        );


        console.log(cuentaEmpresa[0]);
        //aca llamo a la funcion
        generacionPagos(empresa[0], cuentaEmpresa[0], monto)
        //  const pago = await generacionPagos(correo, monto)
        res.status(200).json({
            error: 'transaccion generada'
        });

        await pool.commit; // Confirma la transacción

    } catch (error) {
        await pool.rollback;

        res.status(500).json({
            error: 'Error al crear empresa'
        });

    }
}


// aca llamo a la funcion mas especifica de la generacion de pagos
async function generacionPagos(cuentaEnvio, cuentaEmpresa, monto) {
    try {
        console.log(cuentaEnvio, cuentaEmpresa);
        // busca el id de cuenta electronica envio
        const [cuentaElectronicaEnvio] = await pool.query(
            `SELECT ce.*, ccb.id_cuentaBancaria, ccb.pin FROM cuentasElectronicas ce JOIN codigoCuentasBancarias ccb on ccb.id =ce.id_codigoCuentasBancarias  WHERE id_usuario = ?`,
            [cuentaEnvio.id]
        );
        const [cuentaElectronicaRecibo] = await pool.query(
            `SELECT ce.*, ccb.id_cuentaBancaria, ccb.pin FROM cuentasElectronicas ce JOIN codigoCuentasBancarias ccb on ccb.id =ce.id_codigoCuentasBancarias  WHERE id_usuario = ?`,
            [cuentaEmpresa.id]
        );

        //BUSQUEDA DE PINES



        // ya que se tiene el id solo verificar que tipo de cuenta es, si de banco o de tarjeta
        //tarjeta y banco
        if (cuentaElectronicaEnvio[0].id_tipoCuentaAsociadas === 1 &&
            cuentaElectronicaRecibo[0].id_tipoCuentaAsociadas === 2
        ) {
            // si es tarjeta mandar a llamar al endpoint
            let estadoTransaccion = await metodoPagoTarjeta.determinarCantidadPago(
                cuentaElectronicaEnvio[0].id_cuentaBancaria,
                cuentaElectronicaEnvio[0].pin,
                monto,
                "Motivo de transaccion por tarjeta");


            console.log(estadoTransaccion);

            //cobro para el cliente
            if (estadoTransaccion !== false) {
                // se debe de generar
                console.log("-------------------");
                console.log(cuentaElectronicaEnvio[0].id, cuentaElectronicaRecibo[0].id);


                const [cobro] = await pool.query(
                    `INSERT INTO transacciones 
            (id_estadoTransacciones, id_cuentasElectronicas, id_tipoMovimiento, monto, descripcion_error) 
            VALUES (?, ?, ?, ?, ?)`,
                    [
                        1,
                        cuentaElectronicaEnvio[0].id,
                        2,
                        monto,
                        "Motivo de transaccion por tarjeta"
                    ]
                );
                console.log("-PAGO------------------");

                //pago para la empresa
                const [pago] = await pool.query(
                    `INSERT INTO transacciones 
            (id_estadoTransacciones, id_cuentasElectronicas, id_tipoMovimiento, monto, descripcion_error) 
            VALUES (?, ?, ?, ?, ?)`,
                    [
                        1,
                        cuentaElectronicaRecibo[0].id,
                        1,
                        monto,
                        "Motivo de transaccion desde tarjeta"
                    ]
                );
                console.log('Transacción insertada con ID:', cobro.insertId, pago.insertId);

                //luego de que se genera se debera de crear un valor de monto
                return {
                    message: 'Transacción registrada exitosamente'
                };
            } else {
                const [cobro] = await pool.query(
                    `INSERT INTO transacciones 
            (id_estadoTransacciones, id_cuentasElectronicas, id_tipoMovimiento, monto, descripcion_error) 
            VALUES (?, ?, ?, ?, ?)`,
                    [2, cuentaElectronicaEnvio[0].id, 2, monto, "Motivo de transaccion por tarjeta"]
                );

                return {
                    message: 'Transacción fallida no exite el elemento',
                    cobro
                };
            }


        } // banco -- banco
        else if (cuentaElectronicaEnvio[0].id_tipoCuentaAsociadas === 2 &&
            cuentaElectronicaRecibo[0].id_tipoCuentaAsociadas === 2
        ) {
            //cobro para el cliente
            const [cobro] = await pool.query(
                `INSERT INTO transacciones 
            (id_estadoTransacciones, id_cuentasElectronicas, id_tipoMovimiento, monto, descripcion_error) 
            VALUES (?, ?, ?, ?, ?)`,
                [1, cuentaElectronicaEnvio[0].id, 2, monto, "Motivo de transaccion por banco"]
            );

            //pago para la empresa
            const [pago] = await pool.query(
                `INSERT INTO transacciones 
            (id_estadoTransacciones, id_cuentasElectronicas, id_tipoMovimiento, monto, descripcion_error) 
            VALUES (?, ?, ?, ?, ?)`,
                [
                    1,
                    cuentaElectronicaRecibo[0].id,
                    1,
                    monto,
                    "Motivo de transaccion desde un banco"
                ]
            );
            console.log('Transacción insertada con ID:', cobro.insertId, pago.insertId);

            //luego de que se genera se debera de crear un valor de monto
            return {
                message: 'Transacción registrada exitosamente'
            };
        } // cualquier otra opcion no se puede
        else {
            console.error('Error al insertar transacción:', error);
            throw new Error('No se pudo registrar la transacción, debido a que la combinacion tipos de ingreso/egreso no son validos ');
        }

    } catch (error) {
        console.error('Error al insertar transacción:', error);
        throw new Error('No se pudo registrar la transacción');
    }
}




////////////
////////////
////////////
////////////
////////////
////////////
//REPORTES
//funcion

TodasTransacciones = async (req, res) => {

}

TodasTransaccionesUsuarioId = async (req, res) => {

}

module.exports = {
    creacionTransaccion: creacionTransaccion,
    TodasTransacciones,
    TodasTransaccionesUsuarioId
}