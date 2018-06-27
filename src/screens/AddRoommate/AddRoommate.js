import React, { Component } from 'react'; 
import { View, Text, StyleSheet, FlatList } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import { connect } from 'react-redux';

class AddRoommateScreen extends Component {

    render() {
        return (
            <Backdrop>
                <View style={styles.container}>
                    <Text>Add Roommate Screen</Text>
                </View>
            </Backdrop>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15, 
        flex: 1
    }
}); 

export default AddRoommateScreen; 