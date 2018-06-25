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
    // console.log(url)
    return instance.get(url, { headers: { 'x-auth-token': token } }); 
}; 

export const getFilterDates = (token, month = null, year = null) => {
    let url = '/transactions/dates'; 
    if(month && year) {
        url += `?month=${month}&year=${year}`
    }
    // console.log(url)
    return instance.get(url, { headers: { 'x-auth-token': token } }); 
}; 

export const getFilterCategories = (token, month = null, year = null) => {
    let url = '/transactions/categories'; 
    if(month && year) {
        url += `?month=${month}&year=${year}`
    }
    // console.log(url)
    return instance.get(url, { headers: { 'x-auth-token': token } }); 
}; 

export const getUserCategories = (token) => {
    let url = '/categories'; 
    // console.log(url)
    return instance.get(url, { headers: { 'x-auth-token': token } }); 
}; 

export const createTransaction = (token, transObj) => {
    const url = transObj.type === 'income' ? `/incomes` : `/expenses`; 
    
    return instance.post(url, transObj, { headers: { 'x-auth-token': token } }); 
}; 

export const deleteTransaction = (token, id, type) => {
    const url = type === 'income' ? `/incomes/${id}` : `/expenses/${id}`; 

    return instance.delete(url, { headers: { 'x-auth-token': token } });
}; 

export const updateTransaction = (token, transObj) => {
    const { id, type } = transObj; 
    const url = type === 'income' ? `/incomes/${id}` : `/expenses/${id}`; 
    console.log(transObj);

    return instance.put(url, transObj, { headers: { 'x-auth-token': token } })
}; 

export const addUser = (token, userObj) => {
    const url = `/users`; 
    
    return instance.post(url, userObj, { headers: { 'x-auth-token': token } });
};

export const getCategorizedExpenses = (token, month, year) => {
    let url = '/categories/totals'; 
    if(month && year) {
        url += `?month=${month}&year=${year}`
    }

    return instance.get(url, { headers: { 'x-auth-token': token } });
}; 