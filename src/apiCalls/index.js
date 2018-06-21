import axios from 'axios'; 


const instance = axios.create({
    baseURL: 'https://nsmith.site/api/',
    timeout: 1000
});

export const getTransactions = token => {
    return instance.get('/transactions', { headers: { 'x-auth-token': token } }); 
}; 