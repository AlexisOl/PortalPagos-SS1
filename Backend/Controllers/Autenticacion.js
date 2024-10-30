const axios = require('axios');
const token = require('../utils/token');
// se obtiene la peticion de ingreso login
const login = async (req, res) => {
      //obtiene los valores de ingreso
         const { clientId, clientSecret } = req.body
     try {
        
         // hace la perticion hacia la funcion
         if (token.getToken(clientId, clientSecret)) {
             
            res.status(200).json({ message: 'Ingreso adecuado'});
         } else 
         {
        res.status(500).json({ error: 'Error en usuario' });// Adjust based on what the endpoint returns
             
             }

    } catch (error) {
        console.error('Error fetching token:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error en el ingreso' });
    }
}




module.exports = {
    login
}