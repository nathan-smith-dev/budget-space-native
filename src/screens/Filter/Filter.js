import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Picker from '../../components/Picker/Picker'; 
import { connect } from 'react-redux';
import * as transactionActions from '../../store/actions/transactions'; 
import * as colors from '../../assets/styles/colors';
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import MonthYearSelector from '../../components/MonthYearSelector/MonthYearSelector'; 

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
        

        return (
            <Backdrop>
                <View style={styles.container}>
                    <MonthYearSelector 
                        color={colors.PRIMARY_COLOR}
                        selectedYear={focusedDates && focusedDates.year}
                        selectedMonth={focusedDates && focusedDates.month}
                        onMonthChange={this.handleMonthChange}
                        onYearChange={this.handleYearChange} />
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
    }, 
    headingText: {
        fontSize: 11,
        color: colors.DARK_COLOR, 
        marginBottom: 2
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