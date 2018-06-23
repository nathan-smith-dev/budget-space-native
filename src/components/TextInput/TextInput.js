import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, TextInput, StyleSheet } from 'react-native'; 

const textInput = ({ placeholder, value, onChange, color, size }) => {
    return (
        <View style={[styles.container, {borderColor: color}]}>
            <TextInput 
                style={{fontSize: size, color: color}}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
            />
        </View>
    ); 
};

const styles = StyleSheet.create({
    container: {
        padding: 10, 
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
