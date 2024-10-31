    const {
        LocalStorage
    } = require('node-localstorage')
    const localStorage = new LocalStorage('./scratch');
    const axios = require('axios');
    require('dotenv').config();


    //aca debera de hacer el cobro
    async function determinarCantidadPago(numeroTarjeta, pin, cantidad, descripcion) {

        try {
            // Obtener el token de autenticación
            const token = localStorage.getItem('TOKEN');

            //aca genera la peticion
            console.log(numeroTarjeta, pin, cantidad, descripcion);

            const generacionPago = await axios.post(
                `${process.env.URL_ERICK}/api/pay`, {
                    cardNumber: numeroTarjeta,
                    pin: pin,
                    amount: cantidad,
                    description: descripcion
                }, {
                    headers: {
                        Authorization: token
                    }
                }
            );

            if (generacionPago.data.isAuthorized) {
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


    module.exports = {
        determinarCantidadPago
    }