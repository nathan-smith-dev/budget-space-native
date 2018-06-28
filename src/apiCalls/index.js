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
    
    return instance.post(url, {...transObj, desc: sqlEscapeSingleQuote(transObj.desc)}, { headers: { 'x-auth-token': token } }); 
}; 

export const deleteTransaction = (token, id, type) => {
    const url = type === 'income' ? `/incomes/${id}` : `/expenses/${id}`; 

    return instance.delete(url, { headers: { 'x-auth-token': token } });
}; 

export const updateTransaction = (token, transObj) => {
    const { id, type } = transObj; 
    const url = type === 'income' ? `/incomes/${id}` : `/expenses/${id}`; 
    console.log({...transObj, desc: sqlEscapeSingleQuote(transObj.desc)});

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

export const getTotalIncomesAndExpenses = (token, month, year) => {
    let url = '/expenses/totals'; 
    if(month && year) {
        url += `?month=${month}&year=${year}`
    }

    return instance.get(url, { headers: { 'x-auth-token': token } });
}; 

export const getAnnualCategorizedExpenses = (token, year) => {
    return instance.get(`/categories/totals?annual=${year}`, { headers: { 'x-auth-token': token } }); 
};

export const getAnnualTotalIncomeAndExpense = (token, year) => {
    return instance.get(`/expenses/totals?annual=${year}`, { headers: { 'x-auth-token': token } });
};

export const deleteUserCategory = (token, id) => {
    return instance.delete(`/categories/${id}`, { headers: { 'x-auth-token': token } });
};

export const createUserCategory = (token, categoryName) => {
    return instance.post(`/categories`, { category: sqlEscapeSingleQuote(categoryName) }, { headers: { 'x-auth-token': token } }); 
}; 

export const getRoommateRequests = token => {
    return instance.get(`/roommates/requests`, { headers: { 'x-auth-token': token } }); 
}; 

export const getRoommates = token => {
    return instance.get(`/roommates`, { headers: { 'x-auth-token': token } }); 
}; 

export const deleteRoommate = (token, id) => {
    return instance.delete(`/roommates/${id}`, { headers: { 'x-auth-token': token } }); 
}; 

export const getRoommateIncomesAndExpenses = (token, roommatesArr) => {
        const roommateIds = roommatesArr.map(r => r.id); 
        let promises = []; 
        for(let id of roommateIds) {
            const url = `/roommates/expenses/user/${id}`;
            promises.push(instance.get(url, { headers: { 'x-auth-token': token } })); 
        }
        return promises; 
}; 

export const createRoommateExpense = (token, expenseObj) => {
    return instance.post(`/roommates/expenses`, expenseObj, { headers: { 'x-auth-token': token } }); 
};

export const updateRoommateExpense = (token, expenseObj) => {
    return instance.put(`/roommates/expenses/${expenseObj.id}`, expenseObj, { headers: { 'x-auth-token': token } })
}; 

export const getRoommateNotifications = token => {
    return instance.get(`/roommates/expenses/notifications`, { headers: { 'x-auth-token': token } }); 
}; 

export const getAllUsers = token => {
    return instance.get(`/users`, { headers: { 'x-auth-token': token } }); 
}; 

export const createRoommateRequests = (token, recipientId) => {
    return instance.post(`/roommates/requests`, { recipientId: recipientId }, { headers: { 'x-auth-token': token } }); 
};

export const acceptRoommateRequest = (token, id, accept) => {
    return instance.put(`/roommates/requests/${id}`, { accept: accept }, { headers: { 'x-auth-token': token } })
};

const sqlEscapeSingleQuote = (escString) => { // TODO: this should be done on the server instead. good enough for now
    if(escString) return escString.replace("'", "''"); 
    return ''; 
};
