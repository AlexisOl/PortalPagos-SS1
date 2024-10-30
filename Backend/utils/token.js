const {LocalStorage} = require('node-localstorage')
const localStorage = new LocalStorage('./scratch'); 



const axios = require('axios');

// Define a function to call the external service
async function getToken(clientId, clientSecret) {
    try {
        console.log(clientId, clientSecret);
        
        const elementos = {
        clientId:clientId,
        clientSecret:clientSecret
        }
        
        const response = await axios.post(
            'http://34.42.51.137:3001/api/auth/token', {
                    clientId:clientId,
        clientSecret:clientSecret
        });
        console.log('Token:', response.data);
        localStorage.setItem('TOKEN', `Bearer ${response.data.token}`)
        return true
    } catch (error) {
        console.error('Error fetching token:', error.response ? error.response.data : error.message);
        return false;    
    }

}

module.exports = {
    getToken
}




