import * as actionTypes from './actionTypes';
import * as apiCalls from '../../apiCalls'; 

export const getTotalIncomesAndExpenses = token => {
    return async (dispatch, getState) => {
        let tries = 0; 
        while(tries < 5) {
            try {
                const focusedDates = getState().transactions.trackedDates;
                const totals = await apiCalls.getAnnualTotalIncomeAndExpense(token, focusedDates.year); 
                dispatch(setTotalIncomesAndExpense(totals.data[0])); 
                return; 
            }
            catch(err) {
                // alert('Error getting category filter'); 
                tries++; 
                console.log(err); 
            }
        }
        alert('Error getting total annual incomes and expenses.');
    }; 
}; 

export const getCategorizedExpenses = token => {
    return async (dispatch, getState) => {
        let tries = 0; 
        while(tries < 5) { // Try call to api 5 times 
            try {
                const focusedDates = getState().transactions.trackedDates;
                const expenses = await apiCalls.getAnnualCategorizedExpenses(token, focusedDates.year); 

                dispatch(setCategorizedExpenses(expenses.data));
                return; 
            }
            catch(err) {
                // alert('Error getting transactions'); 
                tries++; 
                console.log(err); 
            }
        }
        alert('Error getting annual categorized expenses.');
    }; 
}; 

export const setTotalIncomesAndExpense = totals => {
    return {
        type: actionTypes.SET_ANNUAL_TOTALS, 
        totals: totals
    };
}; 

export const setCategorizedExpensesLoading = loading => {
    return {
        type: actionTypes.SET_ANNUAL_CATEGORIZED_EXPENSES_LOADING, 
        loading: loading
    };
}; 

export const setCategorizedExpenses = expenses => {
    return {
        type: actionTypes.SET_ANNUAL_CATEGORIZED_EXPENSES, 
        expenses: expenses
    }; 
}; 