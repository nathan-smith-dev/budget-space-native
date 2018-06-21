import * as actionTypes from './actionTypes';
import * as apiCalls from '../../apiCalls'; 

export const getTransactions = token => {
    console.log('Trans action')
    return async (dispatch, getState) => {
        try {
            const focusedDates = getState().transactions.trackedDates;
            const transactions = await apiCalls.getTransactions(token, focusedDates.month, focusedDates.year); 
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
