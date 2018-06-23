import React from 'react';
import PropTypes from 'prop-types'; 
import { View, StyleSheet, TextInput } from 'react-native'; 

const numInput = ({ color, placeholder, onChange, value, size, style }) => {
    return (
        <View style={[styles.container, {borderColor: color}, {...style}]}>
            <TextInput 
                style={{fontSize: size, color: color}}
                keyboardType='numeric'
                placeholder={placeholder}
                onChangeText={(text) => onChange(+text)}
                value={value ? value+'' : null}
            />
        </View>
    ); 
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1, 
        padding: 10, 
        borderRadius: 5
    }
}); 

numInput.propTypes = {
    color: PropTypes.string,
    placeholder: PropTypes.string.isRequired, 
    onChange: PropTypes.func.isRequired, 
    value: PropTypes.number, 
    size: PropTypes.number, 
    style: PropTypes.object
}

export default numInput;