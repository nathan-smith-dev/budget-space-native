import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 

class UserCategoriesScreen extends Component {


    render() {
        return (
            <Backdrop>
                <View style={styles.container}>
                    <Text>User Categories Screen</Text>
                </View>
            </Backdrop>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
}); 

export default UserCategoriesScreen; 