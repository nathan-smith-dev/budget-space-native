import React from 'react';
import PropTypes from 'prop-types';  
import { View, Picker, StyleSheet, Platform } from 'react-native'; 

const picker = ({ data, onValueChange, selectedValue, color, style }) => {
    const items = data.map((item, index) => (
        <Picker.Item 
            key={index}
            label={item.label} 
            value={item.value} color={color} />
    )); 

    return (
        <View 
            style={[styles.container, {borderColor: Platform.OS === 'ios' ? 'transparent' :  color}, {...style}]}>
            <Picker 
                selectedValue={selectedValue}
                onValueChange={onValueChange}
            >
                {items}
            </Picker>
        </View>
    ); 
}; 

const styles = StyleSheet.create({
    container: {
        borderWidth: 1, 
        borderRadius: 5, 
        width: '100%'
    }
})

picker.propTypes = {
    data: PropTypes.arrayOf(Object).isRequired, 
    color: PropTypes.string, 
    onValueChange: PropTypes.func.isRequired,
    style: PropTypes.object,
    selectedValue: PropTypes.any.isRequired
};

export default picker; 