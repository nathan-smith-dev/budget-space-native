import axios from 'axios'; 


const instance = axios.create({
    baseURL: 'https://nsmith.site/api/',
    timeout: 1000
});

export const getTransactions = (token, month = null, year = null) => {
    let url = '/transactions'; 
    if(month && year) {
        url += `?month=${month}&year=${year}`
    }
    console.log(url)
    return instance.get(url, { headers: { 'x-auth-token': token } }); 
}; 