    
const {LocalStorage} = require('node-localstorage')
const localStorage = new LocalStorage('./scratch'); 
const axios = require('axios');
require('dotenv').config();


//aca debera de hacer el cobro
      async function determinarCantidadPago(numeroTarjeta, pin,  cantidad, descripcion) { 
    
        try {
            // Obtener el token de autenticación
            const token = localStorage.getItem('TOKEN');

            // const authResponse = await axios.post(`${process.env.PAYMENT_MICROSERVICE_URL}/api/auth/token`, {
            //     clientId: process.env.CREDIT_CLIENT_ID,
            //     clientSecret: process.env.CREDIT_CLIENT_SECRET
            // });


            //aca genera la peticion
            const generacionPago = await axios.post(
                `${process.env.URL_ERICK}/api/pay`,
                { numeroTarjeta, pin, cantidad, descripcion },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (generacionPago.isAuthorized) {
                return generacionPago
            } else {
                return false
            }
            
        } catch (error) {
            console.log(error)
            // console.error(`Error validating credit transaction: ${error.message}`);
            throw { status: 500, message: 'Error validating credit transaction' };
        }
    }


module.exports = {
        determinarCantidadPago
    }