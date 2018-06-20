import * as actionTypes from '../actions/actionTypes'; 

const initialState = {
    currentUser: null, 
    authToken: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_USER: 
            return {
                ...state, 
                currentUser: action.user
            }; 
        default: 
            return state; 
    }
}

export default reducer; 