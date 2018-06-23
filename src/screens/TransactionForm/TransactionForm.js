import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import { connect } from 'react-redux'; 
import Dropdown from '../../components/Dropdown/Dropdown'; 
import DatePicker from '../../components/DatePicker/DatePicker'; 
import * as colors from '../../assets/styles/colors'; 

class TransactionFormScreen extends Component {

    render() {

        return (
            <Backdrop>
                <View style={styles.container}>
                    <Text>Transaction Form Screen</Text>
                    <DatePicker 
                        
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