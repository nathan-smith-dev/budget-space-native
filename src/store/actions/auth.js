import * as actionTypes from './actionTypes';

export const setUser = (user) => {
    return {
        type: actionTypes.SET_USER, 
        user: user
    };
}; 

export const setAuthToken = token => {
    return {
        type: actionTypes.SET_TOKEN, 
        token: token
    };
}; 

