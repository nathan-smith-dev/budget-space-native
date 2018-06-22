import * as actionTypes from './actionTypes';
import * as apiCalls from '../../apiCalls'; 
import { calcTimezoneOffset } from '../../utilities';

export const getTransactions = token => {
    console.log('Trans action')
    return async (dispatch, getState) => {
        try {
            const focusedDates = getState().transactions.trackedDates;
            const transactions = await apiCalls.getTransactions(token, focusedDates.month, focusedDates.year); 
            
            let transactionsWithJSDate = []; // Date on server is a UTC string. Modify to be JS date in Redux
            for(let transaction of transactions.data) {
                transactionsWithJSDate.push({...transaction, date: calcTimezoneOffset(new Date(transaction.date))}); 
            }
            dispatch(setTransactions(transactionsWithJSDate)); 
        }
        catch(err) {
            alert('Error getting transactions'); 
            console.log(err); 
        }
    }; 
}; 

export const getFilterDates = token => {
    console.log('Trans action')
    return async (dispatch, getState) => {
        try {
            const focusedDates = getState().transactions.trackedDates;
            const transactions = await apiCalls.getFilterDates(token, focusedDates.month, focusedDates.year); 
            const justDates = (transactions.data).map(obj => calcTimezoneOffset(new Date(obj.date))); 
            dispatch(setFilterDates(justDates)); 
        }
        catch(err) {
            alert('Error getting date filter'); 
            console.log(err); 
        }
    }; 
}; 

export const getFilterCategories = token => {
    console.log('Trans action')
    return async (dispatch, getState) => {
        try {
            const focusedDates = getState().transactions.trackedDates;
            const categories = await apiCalls.getFilterCategories(token, focusedDates.month, focusedDates.year); 
            const justCatName = (categories.data).map(catObj => catObj.category); 
            dispatch(setFilterCategories(justCatName)); 
        }
        catch(err) {
            alert('Error getting category filter'); 
            console.log(err); 
        }
    }; 
}; 

export const setTransactions = transactions => {
    return {
        type: actionTypes.SET_TRANSACTIONS, 
        transactions: transactions
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