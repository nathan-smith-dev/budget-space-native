import React, { Component } from 'react'; 
import { View, Text } from 'react-native'; 

import Icon from 'react-native-vector-icons/Ionicons'; 

class Home extends Component {


    render() {
        return (
            <View>
                <Text>Home Screen</Text>
                <Icon size={30} name="ios-trash" color="blue" />
            </View>
        );
    }
}

export default Home; 

