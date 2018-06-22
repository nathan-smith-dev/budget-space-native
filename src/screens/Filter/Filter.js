import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Picker from '../../components/Picker/Picker'; 
import { connect } from 'react-redux';
import * as transactionActions from '../../store/actions/transactions'; 
import * as colors from '../../assets/styles/colors';
import Backdrop from '../../hoc/Backdrop/Backdrop'; 

class FilterScreen extends Component {

    handleMonthChange = (month, index) => {
        const { setTrackedDates, focusedDates, token, getTransactions } = this.props; 
        setTrackedDates({month: month, year: focusedDates.year}); 
        getTransactions(token); 
    }
    
    handleYearChange = (year, index) => {
        const { setTrackedDates, focusedDates, token, getTransactions } = this.props; 
        setTrackedDates({month: focusedDates.month, year: year}); 
        getTransactions(token);
    }

    render() {
        const { focusedDates } = this.props; 
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
            <Backdrop>
                <View style={styles.container}>
                    <Text>Select Filter</Text>
                    <View>
                        <View style={styles.focusedDatesContainer}>
                            <View style={{width: '45%'}}>
                                <Text>Month</Text>
                                <Picker 
                                    style={{width: '100%'}}
                                    selectedValue={focusedDates && focusedDates.month}
                                    onValueChange={this.handleMonthChange}
                                    data={months}
                                    color={colors.PRIMARY_COLOR}
                                />
                            </View>
                            <View style={{width: '45%'}}>
                                <Text>Year</Text>
                                <Picker 
                                    style={{width: '100%'}}
                                    selectedValue={focusedDates && focusedDates.year}
                                    onValueChange={this.handleYearChange}
                                    data={years}
                                    color={colors.PRIMARY_COLOR}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Backdrop>
        ); 
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 15
    }, 
    focusedDatesContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around'
    }
});

const mapStateToProps = state => {
    return {
        focusedDates: state.transactions.trackedDates, 
        token: state.auth.token
    }; 
}; 

const mapDispatchToProps = dispatch => {
    return {
        setTrackedDates: (dateObj) => dispatch(transactionActions.setTrackedDates(dateObj)),
        getTransactions: token => dispatch(transactionActions.getTransactions(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterScreen); 