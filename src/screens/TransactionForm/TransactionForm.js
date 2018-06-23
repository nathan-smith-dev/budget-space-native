import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import { connect } from 'react-redux'; 
import Dropdown from '../../components/Dropdown/Dropdown'; 
import * as colors from '../../assets/styles/colors'; 

class TransactionFormScreen extends Component {

    render() {
        const data = [
            {label: 'Test 1', value: 'test1'},
            {label: 'Test 2', value: 'test2'},
            {label: 'Test 3', value: 'test3'},
        ]; 
        return (
            <Backdrop>
                <View style={styles.container}>
                    <Text>Transaction Form Screen</Text>
                    <Dropdown 
                        data={data}
                        color={colors.PRIMARY_COLOR} 
                        onSelect={(value) => console.log(value)}
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