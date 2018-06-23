import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons'; 
import ModalDropdown from 'react-native-modal-dropdown';

const dropdown = ({ data, color, size, disabled, onSelect, value, placeholder }) => {
    const labels = data.map(item => item.label); 
    const currentValue = getLabelFromValue(value, data);

    return (
        <ModalDropdown 
            options={labels}
            defaultValue={currentValue}
            style={[styles.container, {borderColor: color}]}
            dropdownTextStyle={{fontSize: size, color: color}}
            disabled={disabled}
            onSelect={(index) => mapIndexToData(index, data, onSelect)}
        >
            <View style={styles.textContainer}>
                <Text style={{fontSize: size, color: color}}>{currentValue || placeholder}</Text>
                <Icon 
                    style={{marginLeft: 3}}
                    name="md-arrow-dropdown" 
                    color={color} 
                    size={size} />
            </View>
        </ModalDropdown>
    ); 
};

const mapIndexToData = (index, data, callback) => {
    callback(data[index].value); 
}

const getLabelFromValue = (value, data) => {
    const itemObj = data.filter(item => item.value === value)[0]; 
    if(itemObj)
        return itemObj.label; 
}

const styles = StyleSheet.create({
    container: {
        padding: 10, 
        borderWidth: 1, 
        borderRadius: 5
    }, 
    textContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    }
}); 

dropdown.propTypes = {
    data: PropTypes.arrayOf(Object).isRequired,
    color: PropTypes.string.isRequired, 
    size: PropTypes.number, 
    disabled: PropTypes.bool, 
    onSelect: PropTypes.func.isRequired, 
    value: PropTypes.any, 
    placeholder: PropTypes.string
}; 

export default dropdown; 