import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, TextInput, StyleSheet, Platform } from 'react-native'; 

const textInput = ({ placeholder, value, onChange, color, size }) => {
    return (
        <View style={[styles.container, {borderColor: color}]}>
            <TextInput 
                style={{fontSize: size, color: color, padding: 0}}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                underlineColorAndroid="transparent"
            />
        </View>
    ); 
};

const styles = StyleSheet.create({
    container: {
        padding: Platform.OS === 'ios' ? 10 : 6, 
        borderRadius: 5,
        borderWidth: 1
    }
}); 

textInput.propTypes = {
    color: PropTypes.string, 
    onChange: PropTypes.func.isRequired, 
    value: PropTypes.string, 
    placeholder: PropTypes.string.isRequired, 
    size: PropTypes.number
}; 

export default textInput; 
