import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const media = ({ iconLeft, iconRight, text, color }) => {
    return (
        <View style={styles.container}>
            {iconLeft && <Icon style={styles.iconLeft} name={iconLeft} size={30} color={color} />}
            <Text style={[styles.text, {color: color}]}>{text}</Text>
            {iconRight && <Icon style={styles.iconRight} name={iconRight} size={30} color={color} />}
        </View>
    ); 
}; 

media.propTypes = {
    iconLeft: PropTypes.string, 
    iconRight: PropTypes.string, 
    text: PropTypes.string.isRequired, 
    color: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center'
    }, 
    iconRight: {
        marginLeft: 5
    }, 
    iconLeft: {
        marginRight: 5
    }, 
    text: {
        fontSize: 16
    }
}); 

export default media; 