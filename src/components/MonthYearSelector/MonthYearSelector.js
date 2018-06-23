import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Dropdown from '../../components/Dropdown/Dropdown'; 
import * as colors from '../../assets/styles/colors'; 

const selector = ({ selectedMonth, selectedYear, onMonthChange, onYearChange, color }) => {
    const today = new Date(); 
    const months = [
        {label: 'January', value: 1},
        {label: 'February', value: 2},
        {label: 'March', value: 3},
        {label: 'April', value: 4},
        {label: 'May', value: 5},
        {label: 'June', value: 6},
        {label: 'July', value: 7},
        {label: 'August', value: 8},
        {label: 'September', value: 9},
        {label: 'October', value: 10},
        {label: 'November', value: 11},
        {label: 'December', value: 12},
    ]; 
    const years = [
        {label: today.getFullYear() + '', value: today.getFullYear()},
        {label: (today.getFullYear() - 1) + '', value: today.getFullYear() - 1},
    ]; 

    return (
        <View>
            <Text style={styles.headingText}>Focused Month/Year</Text>
            <View style={styles.focusedDatesContainer}>
                <View>
                    <Text style={styles.subHeadingText}>Month</Text>
                    <Dropdown 
                        value={selectedMonth}
                        onSelect={onMonthChange}
                        data={months}
                        color={color}
                    />
                </View>
                <View>
                    <Text style={styles.subHeadingText}>Year</Text>
                    <Dropdown 
                        value={selectedYear}
                        onSelect={onYearChange}
                        data={years}
                        color={color}
                    />
                </View>
            </View>
        </View>
    ); 
}

const styles = StyleSheet.create({
    focusedDatesContainer: {
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

selector.propTypes = {
    selectedMonth: PropTypes.number.isRequired,
    selectedYear: PropTypes.number.isRequired,
    onYearChange: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func.isRequired,
    color: PropTypes.string
}; 

export default selector; 