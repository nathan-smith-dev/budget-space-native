import * as actionTypes from './actionTypes';
import * as apiCalls from '../../apiCalls'; 
import { calcTimezoneOffset } from '../../utilities';

export const getTransactions = token => {
    return async (dispatch, getState) => {
        let tries = 0; 
        while(tries < 5) { // Try call to api 5 times 
            try {
                const focusedDates = getState().transactions.trackedDates;
                const transactions = await apiCalls.getTransactions(token, focusedDates.month, focusedDates.year); 
                
                let transactionsWithJSDate = []; // Date on server is a UTC string. Modify to be JS date in Redux
                for(let transaction of transactions.data) {
                    transactionsWithJSDate.push({...transaction, date: calcTimezoneOffset(new Date(transaction.date))}); 
                }
                dispatch(setTransactionsLoading(true)); 
                dispatch(setTransactions(transactionsWithJSDate)); 
                dispatch(getFilterCategories(token));
                dispatch(getCategorizedExpenses(token)); 
                dispatch(getFilterDates(token));
                return; 
            }
            catch(err) {
                // alert('Error getting transactions'); 
                tries++; 
                console.log(err); 
            }
        }
        alert('Error getting transactions');
    }; 
}; 

export const getCategorizedExpenses = token => {
    return async (dispatch, getState) => {
        let tries = 0; 
        while(tries < 5) { // Try call to api 5 times 
            try {
                const focusedDates = getState().transactions.trackedDates;
                const expenses = await apiCalls.getCategorizedExpenses(token, focusedDates.month, focusedDates.year); 

                dispatch(setCategorizedExpenses(expenses.data));
                return; 
            }
            catch(err) {
                // alert('Error getting transactions'); 
                tries++; 
                console.log(err); 
            }
        }
        alert('Error getting categorized expenses.');
    }; 
}; 

export const getFilterDates = token => {
    return async (dispatch, getState) => {
        let tries = 0; 
        while(tries < 5) {
            try {
                const focusedDates = getState().transactions.trackedDates;
                const transactions = await apiCalls.getFilterDates(token, focusedDates.month, focusedDates.year); 
                const justDates = (transactions.data).map(obj => calcTimezoneOffset(new Date(obj.date))); 
                dispatch(setFilterDates(justDates)); 
                return; 
            }
            catch(err) {
                // alert('Error getting date filter'); 
                console.log(err); 
                tries++; 
            }
        }
        alert('Error getting filtered dates');
    }; 
}; 

export const getFilterCategories = token => {
    return async (dispatch, getState) => {
        let tries = 0; 
        while(tries < 5) {
            try {
                const focusedDates = getState().transactions.trackedDates;
                const categories = await apiCalls.getFilterCategories(token, focusedDates.month, focusedDates.year); 
                const justCatName = (categories.data).map(catObj => catObj.category); 
                dispatch(setFilterCategories(justCatName)); 
                return; 
            }
            catch(err) {
                // alert('Error getting category filter'); 
                tries++; 
                console.log(err); 
            }
        }
        alert('Error getting filtered categories');
    }; 
}; 

export const getUserCategories = token => {
    return async (dispatch, getState) => {
        let tries = 0; 
        while(tries < 5) {
            try {
                const categories = await apiCalls.getUserCategories(token); 
                dispatch(setUserCategories(categories.data)); 
                return; 
            }
            catch(err) {
                // alert('Error getting category filter'); 
                tries++; 
                console.log(err); 
            }
        }
        alert('Error getting user categories');
    }; 
}; 

export const setTransactions = transactions => {
    return {
        type: actionTypes.SET_TRANSACTIONS, 
        transactions: transactions
    }; 
}; 

export const setCategorizedExpenses = expenses => {
    return {
        type: actionTypes.SET_CATEGORIZED_EXPENSES, 
        expenses: expenses
    }; 
}; 

export const setFilterDates = dates => {
    return {
        type: actionTypes.SET_DATE_FILTERS, 
        dates: dates
    }; 
}; 

export const setFilterCategories = categoryObj => {
    return {
        type: actionTypes.SET_CATEGORY_FILTERS, 
        categories: categoryObj
    }; 
}; 

export const setTrackedDates = dateObj => {
    return {
        type: actionTypes.SET_TRACKED_DATES, 
        trackedDates: dateObj
    }; 
}; 

export const setActiveFilters = activeFilters => {
    return {
        type: actionTypes.SET_ACTIVE_FILTERS, 
        activeFilters: activeFilters
    };
}; 

export const setUserCategories = categories => {
    return {
        type: actionTypes.SET_USER_CATEGORIES, 
        categories: categories
    };
}; 

export const setTransactionsLoading = loading => {
    return {
        type: actionTypes.SET_TRANSACTIONS_LOADING, 
        loading: loading
    };
}; 