import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, StyleSheet, Text } from 'react-native'; 
import Dropdown from '../../components/Dropdown/Dropdown'; 
import * as colors from '../../assets/styles/colors'; 

const filterSelector = ({ primaryData, onPrimaryFilterChange, primaryFilterValue, secondaryData, onSecondaryFilterChange, secondaryFilterValue, color, style }) => {
    return (
        <View>
            <Text style={styles.headingText}>Additional Filters</Text>
            <View style={styles.container}>
                <View>
                    <Text style={styles.subHeadingText}>Primary Filter</Text>
                    <Dropdown 
                        value={primaryFilterValue}
                        data={primaryData}
                        size={14}
                        onSelect={onPrimaryFilterChange}
                        color={color} />
                    />
                </View>
                <View>
                    <Text style={styles.subHeadingText}>Secondary Filter</Text>
                    <Dropdown 
                        data={secondaryData}
                        onSelect={onSecondaryFilterChange}
                        value={secondaryFilterValue}
                        size={14}
                        color={color} 
                    />
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
        marginBottom: 5
    }, 
    subHeadingText: {
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