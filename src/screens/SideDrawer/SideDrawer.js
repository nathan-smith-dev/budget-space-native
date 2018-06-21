import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import { connect } from 'react-redux';
import Media from '../../components/Media/Media'; 
import Touchable from '../../hoc/Touchable/Touchable'; 
import * as colors from '../../assets/styles/colors'; 
import * as firebase from '../../firebase/firebase'; 
import startSinglePage from '../MainTabs/startSinglePage'; 

class SideDrawer extends Component {

    handleLogOut = () => {
        firebase.googleLogout(); 
        startSinglePage(); 
    }

    render() {
        return (
            <View style={styles.container}>
                <Touchable onPress={this.handleLogOut}>
                    <Media iconRight="ios-log-out" text="Log Out" color={colors.PRIMARY_COLOR} />
                </Touchable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee', 
        borderRadius: 5,
        flex: 1, 
        paddingTop: 40,
        paddingLeft: 15, 
        minWidth: '80%'
    }, 
    title: {
        color: 'black', 
        fontSize: 26
    }
})

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
    }
}

export default connect(mapStateToProps)(SideDrawer); 

