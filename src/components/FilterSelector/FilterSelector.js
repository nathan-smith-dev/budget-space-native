import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, StyleSheet, Text } from 'react-native'; 
import Picker from '../../components/Picker/Picker'; 
import * as colors from '../../assets/styles/colors'; 

const filterSelector = ({ primaryData, onPrimaryFilterChange, primaryFilterValue, secondaryData, onSecondaryFilterChange, secondaryFilterValue, color, style }) => {
    return (
        <View>
            <Text style={styles.headingText}>Additional Filters</Text>
            <View style={styles.container}>
                <View>
                    <Text>Primary Filter</Text>
                    <Picker 
                        data={primaryData}
                        onValueChange={onPrimaryFilterChange}
                        selectedValue={primaryFilterValue}
                        color={color} />
                </View>
                <View>
                    <Text>Secondary Filter</Text>
                    <Picker 
                        data={secondaryData}
                        onValueChange={onSecondaryFilterChange}
                        selectedValue={secondaryFilterValue}
                        color={color} />
                </View>
            </View>
        </View>
    ); 
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'space-around'
    }, 
    headingText: {
        fontSize: 11,
        color: colors.DARK_COLOR, 
        marginBottom: 2
    }
});

filterSelector.propTypes = {
    primaryData: PropTypes.arrayOf(Object).isRequired, 
    onPrimaryFilterChange: PropTypes.func.isRequired, 
    primaryFilterValue: PropTypes.any.isRequired, 
    secondaryData: PropTypes.arrayOf(Object).isRequired, 
    onSecondaryFilterChange: PropTypes.func.isRequired, 
    secondaryFilterValue: PropTypes.any.isRequired, 
    color: PropTypes.string, 
    style: PropTypes.string
}; 

export default filterSelector; 