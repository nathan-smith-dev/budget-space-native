import React, { Component } from 'react'; 
import { View, Text, Button, Image, StyleSheet } from 'react-native'; 
import { connect } from 'react-redux';
import * as firebase from '../../firebase/firebase'; 
import bsLogo from '../../assets/images/budget-space-text.png'; 
import ButtonOutline from '../../components/ButtonOutline/ButtonOutline'; 

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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.secondaryContainer}>
                    <Image style= {{flex:1 , width: undefined, height: undefined}} source={bsLogo} />
                </View>
                <View>
                    <ButtonOutline 
                        size={20}
                        text="Login" 
                        color="#ef403b" 
                        iconRight="logo-google"
                        onPress={this.handleGoogleSignIn} />
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
    secondaryContainer: {
        width: 170, 
        height: 150, 
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

