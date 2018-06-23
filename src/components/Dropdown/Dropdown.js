import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, Text, StyleSheet } from 'react-native'; 
import ModalDropdown from 'react-native-modal-dropdown';

const dropdown = ({ data, color, size, disabled, onSelect }) => {
    const labels = data.map(item => item.label); 

    return (
        <ModalDropdown 
            options={labels}
            style={[styles.container, {borderColor: color}]}
            textStyle={{fontSize: size, color: color}}
            dropdownTextStyle={{fontSize: size, color: color}}
            disabled={disabled}
            onSelect={(index) => mapIndexToData(index, data, onSelect)}
        />
    ); 
};

const mapIndexToData = (index, data, callback) => {
    callback(data[index].value); 
}

const styles = StyleSheet.create({
    container: {
        padding: 5, 
        borderWidth: 1, 
        borderRadius: 5
    }
}); 

dropdown.propTypes = {
    data: PropTypes.arrayOf(Object).isRequired,
    color: PropTypes.string.isRequired, 
    size: PropTypes.number, 
    disabled: PropTypes.bool, 
    onSelect: PropTypes.func.isRequired
}; 

export default dropdown; 