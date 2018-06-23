import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import { connect } from 'react-redux'; 
import Dropdown from '../../components/Dropdown/Dropdown'; 
import DatePicker from '../../components/DatePicker/DatePicker'; 
import * as colors from '../../assets/styles/colors'; 
import moment from 'moment'; 

class TransactionFormScreen extends Component {
    state = {
        date: moment()
    }

    handleOnDateChange = date => {
        this.setState({
            date: date
        }); 
    }

    render() {
        const { date } = this.state;
    
        return (
            <Backdrop>
                <View style={styles.container}>
                    <Text>Transaction Form Screen</Text>
                    <DatePicker 
                        selectedDate={date}
                        color={colors.PRIMARY_COLOR}
                        textColor={colors.LIGHT_COLOR}
                        dayHeaderColor={colors.SECONDARY_COLOR}
                        onChange={this.handleOnDateChange}
                    />
                </View>
            </Backdrop>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 15
    }
}); 

mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(null, mapDispatchToProps)(TransactionFormScreen); 