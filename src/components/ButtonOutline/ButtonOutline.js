import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Touchable from '../../hoc/Touchable/Touchable'; 
import Icon from 'react-native-vector-icons/Ionicons'; 

const buttonOutline = (props) => {
    return (
        <Touchable onPress={props.onPress}>
            <View style={[styles.container, {borderColor: props.color}, {...props.style}]}>
                {props.iconLeft && <Icon style={styles.iconLeft} name={props.iconLeft} size={props.size*1.5} color={props.color} />}                 
                <Text style={{color: props.color, fontSize: props.size, fontWeight: props.fontWeight}}>{props.text}</Text>
                {props.iconRight && <Icon style={styles.iconRight} name={props.iconRight} size={props.size*1.5} color={props.color} />}
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
    size: PropTypes.number, 
    fontWeight: PropTypes.string
}; 

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: 10, 
        borderWidth: 1, 
        borderRadius: 5
    }, 
    iconLeft: {
        marginRight: 10
    }, 
    iconRight: {
        marginLeft: 10
    }, 
});

export default buttonOutline; 