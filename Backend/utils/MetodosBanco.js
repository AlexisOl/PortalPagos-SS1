    const {
        LocalStorage
    } = require('node-localstorage')
    const localStorage = new LocalStorage('./scratch');
    const axios = require('axios');
    require('dotenv').config();


    //aca debera de hacer el cobro

    // envio el monto y el correo asociado 
    async function determinarDisponibilidadCobroBanco(monto, codigoCuenta) {

        try {
            // Obtener el token de autenticación
            const token = localStorage.getItem('TOKEN');
            //aca genera la peticion
            console.log(monto, codigoCuenta);
            const generacionPago = await axios.post(
                `${process.env.RUTA_FERNANDO}/cuenta/verificar-saldo/${codigoCuenta}`, {
                    monto: monto,

                }, {
                    headers: {
                        Authorization: 'Bearer ' + process.env.TOKEN_FERNANDO
                    }
                }
            );
            if (generacionPago) {
                return generacionPago
            } else {
                return false
            }

        } catch (error) {
            console.log(error)
            // console.error(`Error validating credit transaction: ${error.message}`);
            throw {
                status: 500,
                message: 'Error validating credit transaction'
            };
        }
    }
    //aca debera de hacer el cobro
    async function ingresoCobroBanco(monto, codigoCuenta, motivo) {

        try {
            // Obtener el token de autenticación
            const token = localStorage.getItem('TOKEN');
            //aca genera la peticion
            console.log(monto, codigoCuenta);
            const generacionPago = await axios.post(
                `${process.env.RUTA_FERNANDO}/cuenta/depositar/${codigoCuenta}`, {
                    monto: monto,
                    motivo: motivo

                }, {
                    headers: {
                        Authorization: 'Bearer ' + process.env.TOKEN_FERNANDO
                    }
                }
            );
            if (generacionPago) {
                return generacionPago
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            throw {
                status: 500,
                message: 'error en al depositar'
            };
        }
    }
    //aca debera de hacer el cobro
    async function retiroCobroBanco(monto, codigoCuenta, motivo, tipoEnvio) {

        try {
            // Obtener el token de autenticación
            const token = localStorage.getItem('TOKEN');
            //aca genera la peticion
            console.log(monto, codigoCuenta);
            const generacionPago = await axios.post(
                `${process.env.RUTA_FERNANDO}/cuenta/retirar/${codigoCuenta}`, {
                    monto: monto,
                    motivo: motivo

                }, {
                    headers: {
                        Authorization: 'Bearer ' + process.env.TOKEN_FERNANDO
                    }
                }
            );
            if (generacionPago) {
                return generacionPago
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            throw {
                status: 500,
                message: 'error en al retirar'
            };
        }
    }

    module.exports = {
        determinarDisponibilidadCobroBanco,
        ingresoCobroBanco,
        retiroCobroBanco
    }