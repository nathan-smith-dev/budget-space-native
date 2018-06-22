import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import { connect } from 'react-redux'; 


class TransactionFormScreen extends Component {


    render() {
        return (
            <Backdrop>
                <View style={styles.container}>
                    <Text>Transaction Form Screen</Text>
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