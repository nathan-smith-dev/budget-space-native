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
                onChangeText={(text) => onChange(+text)}
                value={value ? value+'' : null}
            />
        </View>
    ); 
};

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
    value: PropTypes.number, 
    size: PropTypes.number, 
    style: PropTypes.object
}

export default numInput;