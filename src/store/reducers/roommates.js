import * as actionTypes from '../actions/actionTypes'; 

const initialState = {
    requests: null, 
    mates: null, 
    notifications: {}, 
    mateTransactions: [], 
    loading: true
}; 

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_ROOMATE_REQUESTS: 
            return {
                ...state,
                requests: action.roommateRequests,
            }; 
        case actionTypes.SET_ROOMATES: 
            return {
                ...state,
                mates: action.mates,
                loading: false
            }; 
        case actionTypes.SET_FOCUSED_ROOMMATE: 
            return {
                ...state,
                focusedRoommate: action.roommate,
            }; 
        case actionTypes.SET_ROOMMATE_NOTIFICATIONS: 
            return {
                ...state,
                notifications: action.notifications,
            }; 
        case actionTypes.SET_ROOMATES_TRANSACTIONS: 
            return {
                ...state,
                mateTransactions: action.transactions,
            }; 
        default: 
            return {
                ...state
            }; 
    }
}; 

export default reducer; 