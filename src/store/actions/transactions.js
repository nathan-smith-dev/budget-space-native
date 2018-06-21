import * as actionTypes from './actionTypes';
import * as apiCalls from '../../apiCalls'; 

export const getTransactions = token => {
    console.log('Trans action')
    return async dispatch => {
        try {
            const transactions = await apiCalls.getTransactions(token); 
            dispatch(setTransactions(transactions.data)); 
        }
        catch(err) {
            alert('Error getting transactions'); 
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
