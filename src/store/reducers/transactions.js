import * as actionTypes from '../actions/actionTypes'; 

const today = new Date(); 
const initialState = {
    transactions: [], 
    filters: {
        dates: [], 
        categories: []
    }, 
    trackedDates: {
        month: today.getMonth() + 1, 
        year: today.getFullYear()
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_TRANSACTIONS: 
            return {
                ...state, 
                transactions: action.transactions
            }; 
        case actionTypes.SET_TRACKED_DATES: 
            return {
                ...state, 
                trackedDates: action.trackedDates
            }; 
        case actionTypes.SET_DATE_FILTERS: 
            return {
                ...state, 
                filters: {
                    ...state.filters, 
                    dates: action.dates
                }
            }; 
        default: 
            return state; 
    }
}

export default reducer; 