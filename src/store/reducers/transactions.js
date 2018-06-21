import * as actionTypes from '../actions/actionTypes'; 

const initialState = {
    transactions: [], 
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