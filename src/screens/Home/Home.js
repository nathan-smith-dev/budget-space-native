import React, { Component } from 'react'; 
import { View, Text, Button } from 'react-native'; 
import { GoogleSignin } from 'react-native-google-signin';

import Icon from 'react-native-vector-icons/Ionicons'; 

class Home extends Component {

    componentWillMount() {
        GoogleSignin.hasPlayServices({ autoResolve: true }); 

        GoogleSignin.configure({
            iosClientId: '201170765759-f72jmcl7hcd4uo1j91k36s71d7g9u2a6.apps.googleusercontent.com', // only for iOS
            webClientId: '201170765759-jjg6erk3u99ql5c6kgdao9vb7obiussv.apps.googleusercontent.com'
          });
    }

    handleGoogleSignIn = () => {
        GoogleSignin.signIn()
            .then((user) => {
                console.log(user.idToken);
                this.setState({user: user});
            })
            .catch((err) => {
                console.log('WRONG SIGNIN', err);
            }).done();
    }

    render() {
        return (
            <View>
                <Text>Home Screen</Text>
                <Icon size={30} name="ios-trash" color="blue" />
                <Button title="Login with Google" color="orange" onPress={this.handleGoogleSignIn} />
            </View>
        );
    }
}

export default Home; 

