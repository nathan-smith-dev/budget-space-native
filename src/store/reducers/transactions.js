import * as actionTypes from '../actions/actionTypes'; 

const today = new Date(); 
const initialState = {
    transactions: [], 
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
        default: 
            return state; 
    }
}

export default reducer; 