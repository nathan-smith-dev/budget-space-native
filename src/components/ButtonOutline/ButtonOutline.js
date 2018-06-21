import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Touchable from '../../hoc/Touchable/Touchable'; 
import Icon from 'react-native-vector-icons/Ionicons'; 

const buttonOutline = (props) => {
    return (
        <Touchable onPress={props.onPress}>
            <View style={[styles.container, {borderColor: props.color}]}>
                {props.iconLeft && <Icon style={styles.iconLeft} name={props.iconLeft} size={30} color={props.color} />}                 
                <Text style={[styles.text, {color: props.color}]}>{props.text}</Text>
                {props.iconRight && <Icon style={styles.iconRight} name={props.iconRight} size={30} color={props.color} />}
            </View>
        </Touchable>
    ); 
}; 

buttonOutline.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired, 
    iconRight: PropTypes.string, 
    iconLeft: PropTypes.string, 
}; 

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10, 
        borderWidth: 2, 
        borderRadius: 5
    }, 
    text: {
        fontSize: 20, 
        fontWeight: "800"
    }, 
    iconLeft: {
        marginRight: 10
    }, 
    iconRight: {
        marginLeft: 10
    }, 
});

export default buttonOutline; 