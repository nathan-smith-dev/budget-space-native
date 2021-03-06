import firebase from 'react-native-firebase'; 
import { GoogleSignin } from 'react-native-google-signin';
import { store } from '../../App';

import * as authActions from '../store/actions/auth'; 
import * as transactionActions from '../store/actions/transactions'; 
import * as roommateActions from '../store/actions/roommates'; 
import * as apiCalls from '../apiCalls'; 

export const configureGoogleSignin = () => {
    GoogleSignin.hasPlayServices({ autoResolve: true }); 

    GoogleSignin.configure({
        iosClientId: '201170765759-f72jmcl7hcd4uo1j91k36s71d7g9u2a6.apps.googleusercontent.com', // only for iOS
        webClientId: '201170765759-jjg6erk3u99ql5c6kgdao9vb7obiussv.apps.googleusercontent.com'
    });
}

export const registerAuthListeners = () => { 
    const listeners = []; 

    listeners.push( // All redux gets here
        firebase.auth().onUserChanged(() => {
            const currentUser = firebase.auth().currentUser; 
            store.dispatch(authActions.setUser(currentUser)); 
        })
    ); 

    listeners.push(
        firebase.auth().onIdTokenChanged(async () => {
            const currentUser = firebase.auth().currentUser; 
            if(currentUser) {
                const token = await currentUser.getIdToken(); 
                store.dispatch(authActions.setAuthToken(token)); 
                store.dispatch(authActions.getAllUsers(token)); 
                if(token) {
                    addUserToDatabase(currentUser, token); 
                    store.dispatch(transactionActions.getTransactions(token)); 
                    store.dispatch(transactionActions.getUserCategories(token)); 
                    store.dispatch(roommateActions.getRoommateRequests(token)); 
                    store.dispatch(roommateActions.getRoommates(token)); 
                }
            }
            else {
                store.dispatch(authActions.setAuthToken(null)); 
            }
        })
    ); 

    return listeners; 
}

const addUserToDatabase = async (currentUser, token) => {
    const userObj = {
        id: currentUser.uid, 
        email: currentUser.email, 
        firstName: currentUser.displayName.split(' ')[0],
        lastName: currentUser.displayName.split(' ')[1]
    }; 

    let tries = 0; 
    while(tries < 5) {
        try {
            await apiCalls.addUser(token, userObj); 
            return; 
        }
        catch(err) {
            console.log(err); 
            tries++; 
        }
    }
    alert('Failed adding user to database.'); 
}

export const googleLogin = async () => {
    try {
        const data = await GoogleSignin.signIn();

        // create a new firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
        // console.log(data); 
        // login with credential
        const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
    } catch (e) {
        console.error(e);
    }
}

export const googleLogout = () => {
    GoogleSignin.signOut(); 
    firebase.auth().signOut(); 
}