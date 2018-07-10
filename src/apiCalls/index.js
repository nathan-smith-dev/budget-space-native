import axios from 'axios'; 
import { getRandomTimeout } from '../utilities';

const instance = axios.create({
    baseURL: 'https://budget-space.com/api/'
});

export const getTransactions = (token, month = null, year = null) => {
    let url = '/transactions'; 
    if(month && year) {
        url += `?month=${month}&year=${year}`
    }
    // console.log(url)
    return instance.get(url, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) }); 
}; 

export const getFilterDates = (token, month = null, year = null) => {
    let url = '/transactions/dates'; 
    if(month && year) {
        url += `?month=${month}&year=${year}`
    }
    // console.log(url)
    return instance.get(url, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) }); 
}; 

export const getFilterCategories = (token, month = null, year = null) => {
    let url = '/transactions/categories'; 
    if(month && year) {
        url += `?month=${month}&year=${year}`
    }
    // console.log(url)
    return instance.get(url, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) }); 
}; 

export const getUserCategories = (token) => {
    let url = '/categories'; 
    // console.log(url)
    return instance.get(url, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) }); 
}; 

export const createTransaction = (token, transObj) => {
    const url = transObj.type === 'income' || transObj.type === 'Income' ? `/incomes` : `/expenses`; 
    
    return instance.post(url, {...transObj, desc: sqlEscapeSingleQuote(transObj.desc)}, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) }); 
}; 

export const deleteTransaction = (token, id, type) => {
    const url = type === 'Income' || type === 'income' ? `/incomes/${id}` : `/expenses/${id}`; 

    return instance.delete(url, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) });
}; 

export const updateTransaction = (token, transObj) => {
    const { id, type } = transObj; 
    const url = type === 'income' || type === 'Income' ? `/incomes/${id}` : `/expenses/${id}`; 
    console.log(transObj); 

    return instance.put(url, transObj, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) })
}; 

export const addUser = (token, userObj) => {
    const url = `/users`; 
    
    return instance.post(url, userObj, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) });
};

export const getCategorizedExpenses = (token, month, year) => {
    let url = '/categories/totals'; 
    if(month && year) {
        url += `?month=${month}&year=${year}`
    }

    return instance.get(url, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) });
}; 

export const getTotalIncomesAndExpenses = (token, month, year) => {
    let url = '/expenses/totals'; 
    if(month && year) {
        url += `?month=${month}&year=${year}`
    }

    return instance.get(url, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) });
}; 

export const getAnnualCategorizedExpenses = (token, year) => {
    return instance.get(`/categories/totals?annual=${year}`, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) }); 
};

export const getAnnualTotalIncomeAndExpense = (token, year) => {
    return instance.get(`/expenses/totals?annual=${year}`, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) });
};

export const deleteUserCategory = (token, id) => {
    return instance.delete(`/categories/${id}`, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) });
};

export const createUserCategory = (token, categoryName) => {
    return instance.post(`/categories`, { category: sqlEscapeSingleQuote(categoryName) }, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) }); 
}; 

export const getRoommateRequests = token => {
    return instance.get(`/roommates/requests`, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) }); 
}; 

export const getRoommates = token => {
    return instance.get(`/roommates`, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) }); 
}; 

export const deleteRoommate = (token, id) => {
    return instance.delete(`/roommates/${id}`, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) }); 
}; 

export const getRoommateIncomesAndExpenses = (token, roommatesArr) => {
        const roommateIds = roommatesArr.map(r => r.id); 
        let promises = []; 
        for(let id of roommateIds) {
            const url = `/roommates/expenses/user/${id}`;
            promises.push(instance.get(url, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) })); 
        }
        return promises; 
}; 

export const createRoommateExpense = (token, expenseObj) => {
    return instance.post(`/roommates/expenses`, expenseObj, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) }); 
};

export const updateRoommateExpense = (token, expenseObj) => {
    return instance.put(`/roommates/expenses/${expenseObj.id}`, expenseObj, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) })
}; 

export const getRoommateNotifications = token => {
    return instance.get(`/roommates/expenses/notifications`, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) }); 
}; 

export const getAllUsers = token => {
    return instance.get(`/users`, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) }); 
}; 

export const createRoommateRequests = (token, recipientId) => {
    return instance.post(`/roommates/requests`, { recipientId: recipientId }, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) }); 
};

export const acceptRoommateRequest = (token, id, accept) => {
    return instance.put(`/roommates/requests/${id}`, { accept: accept }, { headers: { 'x-auth-token': token }, timeout: getRandomTimeout(1, 3) })
};

const sqlEscapeSingleQuote = (escString) => { // TODO: this should be done on the server instead. good enough for now
    if(escString) return escString.replace("'", "''"); 
    return ''; 
};
