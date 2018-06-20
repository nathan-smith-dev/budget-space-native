import React, { Component } from 'react'; 
import { View, Text, Button } from 'react-native'; 
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'; 
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons'; 

class Home extends Component {

    componentWillMount() {
        GoogleSignin.hasPlayServices({ autoResolve: true }); 

        GoogleSignin.configure({
            iosClientId: '201170765759-f72jmcl7hcd4uo1j91k36s71d7g9u2a6.apps.googleusercontent.com', // only for iOS
            webClientId: '201170765759-jjg6erk3u99ql5c6kgdao9vb7obiussv.apps.googleusercontent.com'
          });

        firebase.auth().onUserChanged(() => {
            const currentUser = firebase.auth().currentUser; 
            if(currentUser) {
                console.log('Current User: ', currentUser);
            }
            else {
                console.log('User is null.'); 
            }
        })
    }

    // handleGoogleSignIn = () => {
    //     GoogleSignin.signIn()
    //         .then((user) => {
    //             console.log(user.idToken);
    //             this.setState({user: user});
    //         })
    //         .catch((err) => {
    //             console.log('WRONG SIGNIN', err);
    //         }).done();
    // }
    googleLogin = async () => {
        try {
        GoogleSignin.hasPlayServices({ autoResolve: true }); 

        GoogleSignin.configure({
            iosClientId: '201170765759-f72jmcl7hcd4uo1j91k36s71d7g9u2a6.apps.googleusercontent.com', // only for iOS
            webClientId: '201170765759-jjg6erk3u99ql5c6kgdao9vb7obiussv.apps.googleusercontent.com'
            });
      
          const data = await GoogleSignin.signIn();
      
          // create a new firebase credential with the token
          const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
          console.log(data); 
          // login with credential
          const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
          console.log(await currentUser.user.getIdToken()); 
        } catch (e) {
          console.error(e);
        }
      }
    
    googleLogout = () => {
        GoogleSignin.signOut(); 
        firebase.auth().signOut(); 
    }

    getCurrentUser = async () => {
        const currentUser = firebase.auth().currentUser; 
        console.log(currentUser);
        console.log(await currentUser.getIdToken()); 
    }

    render() {
        return (
            <View>
                <Text>Home Screen</Text>
                <Icon size={30} name="ios-trash" color="blue" />
                <Button title="Login with Google" color="orange" onPress={this.googleLogin} />
                <Button title="Logout" color="red" onPress={this.googleLogout} />
                <Button title="Get Current User" color="green" onPress={this.getCurrentUser} />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.user,
    }
}

export default connect(mapStateToProps)(Home); 

