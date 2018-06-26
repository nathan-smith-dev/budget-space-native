import * as actionTypes from '../actions/actionTypes'; 

const initialState = {
    categorizedExpenses: [], 
    categorizedExpensesLoading: true, 
    totals: {
        incomes: 0, 
        expenses: 0
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_ANNUAL_CATEGORIZED_EXPENSES_LOADING: 
            return {
                ...state, 
                categorizedExpensesLoading: action.loading
            }; 
        case actionTypes.SET_ANNUAL_TOTALS: 
            return {
                ...state, 
                totals: action.totals
            }; 
        case actionTypes.SET_ANNUAL_CATEGORIZED_EXPENSES: 
            return {
                ...state, 
                categorizedExpenses: action.expenses, 
                categorizedExpensesLoading: false
            }; 
        default: 
            return state; 
    }
}

export default reducer; 