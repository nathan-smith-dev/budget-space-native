import React from 'react';
import PropTypes from 'prop-types'; 
import { View, StyleSheet, TextInput, Platform } from 'react-native'; 

const numInput = ({ color, placeholder, onChange, value, size, style }) => {
    return (
        <View style={[styles.container, {borderColor: color}, {...style}]}>
            <TextInput 
                underlineColorAndroid="transparent"
                style={{fontSize: size, color: color, padding: 0}}
                keyboardType='numeric'
                placeholder={placeholder}
                onChangeText={(text) => onChange(smartNumberFormat(text))}
                value={value}
            />
        </View>
    ); 
};

const smartNumberFormat = text => {
    let cleanAmount = text.replace(/\D/g,''); // removes all non numeric characters
    cleanAmount = cleanAmount.slice(0, -2) +"."+cleanAmount.slice(-2); // add decimal point back
    if(cleanAmount.length === 1 && cleanAmount === ".") cleanAmount = ""; 
    return cleanAmount; 
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1, 
        padding: Platform.OS === 'ios' ? 10 : 6, 
        borderRadius: 5
    }
}); 

numInput.propTypes = {
    color: PropTypes.string,
    placeholder: PropTypes.string.isRequired, 
    onChange: PropTypes.func.isRequired, 
    value: PropTypes.string, 
    size: PropTypes.number, 
    style: PropTypes.object
}

export default numInput;