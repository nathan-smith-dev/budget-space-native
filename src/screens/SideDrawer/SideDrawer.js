import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import { connect } from 'react-redux';

class SideDrawer extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>Drawer</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee', 
        borderRadius: 5,
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'space-around'
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

