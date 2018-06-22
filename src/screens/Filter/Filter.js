import React, { Component } from 'react'; 
import { View, Text, StyleSheet, Picker } from 'react-native'; 
import { connect } from 'react-redux';
import * as transactionActions from '../../store/actions/transactions'; 

class FilterScreen extends Component {

    handleMonthChange = (month, index) => {
        const { setTrackedDates, focusedDates } = this.props; 
        setTrackedDates({month: month, year: focusedDates.year}); 
    }
    
    handleYearChange = (year, index) => {
        const { setTrackedDates, focusedDates } = this.props; 
        setTrackedDates({month: focusedDates.month, year: year}); 
    }

    render() {
        const { focusedDates } = this.props; 
        const today = new Date(); 

        return (
            <View>
                <Text>Select Filter</Text>
                <View>
                    <View>
                        <Text>Month</Text>
                        <Picker 
                            selectedValue={focusedDates && focusedDates.month}
                            onValueChange={this.handleMonthChange}
                        >
                            <Picker.Item label="January" value={1} />
                            <Picker.Item label="February" value={2} />
                            <Picker.Item label="March" value={3} />
                            <Picker.Item label="April" value={4} />
                            <Picker.Item label="May" value={5} />
                            <Picker.Item label="June" value={6} />
                            <Picker.Item label="July" value={7} />
                            <Picker.Item label="August" value={8} />
                            <Picker.Item label="September" value={9} />
                            <Picker.Item label="October" value={10} />
                            <Picker.Item label="November" value={11} />
                            <Picker.Item label="December" value={12} />
                        </Picker>
                    </View>
                    <View>
                        <Text>Year</Text>
                        <Picker 
                            selectedValue={focusedDates && focusedDates.year}
                            onValueChange={this.handleYearChange}
                        >
                            <Picker.Item label={today.getFullYear() + ''} value={today.getFullYear()} />
                            <Picker.Item label={(today.getFullYear() - 1) + ''} value={today.getFullYear() - 1} />
                        </Picker>
                    </View>
                </View>
            </View>
        ); 
    }
}

const mapStateToProps = state => {
    return {
        focusedDates: state.transactions.trackedDates
    }; 
}; 

const mapDispatchToProps = dispatch => {
    return {
        setTrackedDates: (dateObj) => dispatch(transactionActions.setTrackedDates(dateObj)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterScreen); 