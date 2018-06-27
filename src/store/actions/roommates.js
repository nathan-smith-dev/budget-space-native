import * as actionTypes from './actionTypes';
import * as apiCalls from '../../apiCalls'; 

export const getRoommateRequests = token => {
    return async dispatch => {
        let tries = 0; 
        while(tries < 5) {
            try {
                const requests = await apiCalls.getRoommateRequests(token);
                dispatch(setRoomateRequests(requests.data)); 
                return; 
            }
            catch(err) {
                tries++; 
                console.log(err); 
            }
        }
        alert('Error getting roommate requests.');
    }
}; 

export const setRoomateRequests = (requests) => {
    return {
        type: actionTypes.SET_ROOMATE_REQUESTS, 
        roommateRequests: requests
    }; 
}; 

export const getRoommates = token => {
    return async dispatch => {
        let tries = 0; 
        while(tries < 5) {
            try {
                const roommates = await apiCalls.getRoommates(token);
                dispatch(setRoommates(roommates.data)); 
                dispatch(getRoommateIncomesAndExpenses(token, roommates.data));  

                const notifications = await apiCalls.getRoommateNotifications(token); 
                let data = {}; 
                for(let notification of notifications.data)
                    data[notification.roomateId] = notification.notifications;             
                dispatch(setRoommateNotifications(data)); 
                return; 
            }
            catch(err) {
                tries++; 
                console.log(err); 
            }
        }
        alert('Error getting roommates.');
    }
}

export const getRoommateIncomesAndExpenses = (token, roommates) => {
    return async dispatch => {
        let tries = 0; 
        while(tries < 5) {
            try {
                const results = await Promise.all(apiCalls.getRoommateIncomesAndExpenses(token, roommates)); 
                let data = {}; 
                results.map(incomesAndExpenses => {
                    if(incomesAndExpenses.data && incomesAndExpenses.data.length > 0) {
                        data[incomesAndExpenses.data[0].roommateId] = incomesAndExpenses.data.map(ie => { return {...ie, date: new Date(ie.date) }});
                    }
                    return 0; // stops webpack compiler warning
                }); 
                dispatch(setRoommatesTransactions(data)); 
                return; 
            }
            catch(err) {
                tries++; 
                console.log(err); 
            }
        }
        alert('Error getting roommate income and expenses'); 
    }
}

export const setRoommates = (roommates) => {
    return {
        type: actionTypes.SET_ROOMATES, 
        mates: roommates 
    }; 
}; 

export const setRoommatesTransactions = (trans) => {
    return {
        type: actionTypes.SET_ROOMATES_TRANSACTIONS, 
        transactions: trans
    }; 
}; 

export const setRoommateNotifications = (notifications) => {
    return {
        type: actionTypes.SET_ROOMMATE_NOTIFICATIONS, 
        notifications: notifications
    }; 
}

// export const setFocusedRoomateSuccess = (roommate) => {
//     return {
//         type: actionTypes.SET_FOCUSED_ROOMMATE, 
//         roommate: roommate
//     }; 
// }; 

// export const setFocusedRoomate = (roommateUid) => {
//     return dispatch => {
//         apiCalls.getUser(roommateUid, user => dispatch(setFocusedRoomateSuccess(user[0]))); 
//     }
// }; 