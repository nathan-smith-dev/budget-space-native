import React, { Component } from 'react'; 
import { View, Text, Button, Image, StyleSheet } from 'react-native'; 
import { connect } from 'react-redux';
import * as firebase from '../../firebase/firebase'; 
import Icon from 'react-native-vector-icons/Ionicons'; 
import bsLogo from '../../assets/images/budget-space_logo.png'; 

class AuthScreen extends Component {

    componentWillMount() {
        firebase.configureGoogleSignin(); 
        this.firebaseListeners = firebase.registerAuthListeners(); 
    }

    componentWillUnmount() {
        for(let listener in this.firebaseListeners) {
            // unregister the listeners here
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
            <View style={styles.container}>
                <View>
                    <Image source={bsLogo} height={50} />
                    <Text style={styles.title}>Budget Space</Text>
                </View>
                <View>
                    <Button title="Login with Google" color="orange" onPress={this.handleGoogleSignIn} />
                    <Button title="Logout" color="red" onPress={this.handleGoogleSignOut} />
                    <Button title="Get Current User" color="green" onPress={this.handleGetUser} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#254e7b', 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'space-around'
    }, 
    title: {
        color: 'white', 
        fontSize: 26
    }
})

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
    }
}

export default connect(mapStateToProps)(AuthScreen); 

