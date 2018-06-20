import React, { Component } from 'react'; 
import { View, Text, Button } from 'react-native'; 
import { connect } from 'react-redux';
import * as firebase from '../../firebase/firebase'; 

import Icon from 'react-native-vector-icons/Ionicons'; 

class Home extends Component {

    componentWillMount() {
        firebase.configureGoogleSignin(); 
        this.firebaseListeners = firebase.registerAuthListeners(); 
    }

    componentWillUnmount() {
        for(let listener in this.firebaseListeners) {
            listener(); 
        }
    }

    handleGoogleSignIn = () => {
        firebase.googleLogin(); 
    }
    
    handleGoogleSignOut = () => {
        firebase.googleLogout(); 
    }

    handleGetUser = async () => {
        const { currentUser } = this.props; 
        console.log(currentUser); 
    }

    render() {
        return (
            <View>
                <Text>Home Screen</Text>
                <Icon size={30} name="ios-trash" color="blue" />
                <Button title="Login with Google" color="orange" onPress={this.handleGoogleSignIn} />
                <Button title="Logout" color="red" onPress={this.handleGoogleSignOut} />
                <Button title="Get Current User" color="green" onPress={this.handleGetUser} />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
    }
}

export default connect(mapStateToProps)(Home); 

