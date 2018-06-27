import * as actionTypes from './actionTypes';
import startMainTabs from '../../screens/MainTabs/startMainTabs'; 
import * as apiCalls from '../../apiCalls'; 

export const getAllUsers = token => {
    return async dispatch => {
        let tries = 0; 
        while(tries < 5) {
            try {
                const users = await apiCalls.getAllUsers(token);
                dispatch(setAllUsers(users.data)); 
                return;
            }
            catch(err) {
                console.log(err); 
                tries++; 
            }
        }
        alert('Error getting users.'); 
    }
}

export const setUser = (user) => {
    if(user) {
        startMainTabs();
    }
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

export const setAllUsers = users => {
    return {
        type: actionTypes.SET_ALL_USERS, 
        users: users
    };
}; 
