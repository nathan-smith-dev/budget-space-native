import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Picker from '../../components/Picker/Picker'; 
import { connect } from 'react-redux';
import * as transactionActions from '../../store/actions/transactions'; 
import * as colors from '../../assets/styles/colors';
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import MonthYearSelector from '../../components/MonthYearSelector/MonthYearSelector'; 
import FilterSelector from '../../components/FilterSelector/FilterSelector'; 
import { formatDate, calcTimezoneOffset } from '../../utilities';
import { Navigation } from 'react-native-navigation'; 

class FilterScreen extends Component {
    constructor(props) {
        super(props); 

        const { navigator } = props; 
        // console.log(navigator); 
        navigator.setOnNavigatorEvent(this.onNavigatorEvent); 
    }

    onNavigatorEvent = event => {
        if(event.type === 'NavBarButtonPress' && event.id === 'goBack') {
            Navigation.dismissModal({
                animationType: 'slide-down'
            }); 
        }
    }

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

    handlePrimaryFilterChange = (value, index) => {
        const { filters, setActiveFilters } = this.props; 
        const activeFilters = {
            ...filters.activeFilters, 
            primaryFilter: value,
            secondaryFilter: 'none'
        }; 
        setActiveFilters(activeFilters); 
    }
    
    handleSecondaryFilterChange = (value, index) => {
        console.log(value)
        const { filters, setActiveFilters } = this.props; 
        const activeFilters = {
            ...filters.activeFilters, 
            secondaryFilter: value, 
        }; 
        setActiveFilters(activeFilters); 
    }

    render() {
        const { focusedDates, filters } = this.props; 
        const primaryFilters = [
            {label: 'Date', value: 'date'},
            {label: 'Category', value: 'category'}, 
            {label: 'None', value: 'none'}
        ]; 
        let secondaryFilters = [{label: 'None', value: 'none'}]; 
        if(filters.activeFilters.primaryFilter === 'date') 
            secondaryFilters = secondaryFilters.concat((filters.dates).map(date => {return {label: formatDate(new Date(date)), value: calcTimezoneOffset(new Date(date)).toDateString()}})); 
        else if(filters.activeFilters.primaryFilter === 'category')
            secondaryFilters = secondaryFilters.concat((filters.categories).map(cat => {return {label: cat, value: cat}})); 

        return (
            <Backdrop>
                <View style={styles.container}>
                    <View style={styles.subcontainer}>
                        <MonthYearSelector 
                            color={colors.PRIMARY_COLOR}
                            selectedYear={focusedDates && focusedDates.year}
                            selectedMonth={focusedDates && focusedDates.month}
                            onMonthChange={this.handleMonthChange}
                            onYearChange={this.handleYearChange} />
                    </View>
                    <View>
                        <FilterSelector 
                            color={colors.PRIMARY_COLOR}
                            primaryData={primaryFilters}
                            secondaryData={secondaryFilters}
                            onPrimaryFilterChange={this.handlePrimaryFilterChange}
                            primaryFilterValue={filters.activeFilters.primaryFilter}
                            onSecondaryFilterChange={this.handleSecondaryFilterChange}
                            secondaryFilterValue={filters.activeFilters.secondaryFilter}
                        />
                    </View>
                </View>
            </Backdrop>
        ); 
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 15, 
    }, 
    subcontainer: {
        marginBottom: 20
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
        token: state.auth.token, 
        filters: state.transactions.filters
    }; 
}; 

const mapDispatchToProps = dispatch => {
    return {
        setTrackedDates: (dateObj) => dispatch(transactionActions.setTrackedDates(dateObj)),
        getTransactions: token => dispatch(transactionActions.getTransactions(token)), 
        setActiveFilters: filters => dispatch(transactionActions.setActiveFilters(filters))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterScreen); 