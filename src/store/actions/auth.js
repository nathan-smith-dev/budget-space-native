import * as actionTypes from './actionTypes';
import startMainTabs from '../../screens/MainTabs/startMainTabs'; 

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

