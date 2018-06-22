import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import * as colors from '../../assets/styles/colors'; 

class TransactionDetailScreen extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired, 
        amount: PropTypes.number.isRequired, 
        date: PropTypes.string.isRequired, 
        type: PropTypes.string.isRequired, 
        category: PropTypes.string.isRequired
    }

    render() {
        const { id, amount, date, category, type } = this.props; 
        return (
            <Backdrop>
                <View style={styles.container}>
                    <Text style={styles.headingText}>Date</Text>
                    <Text style={styles.detailText}>{new Date(date).toLocaleDateString('en-us')}</Text>
                    <Text style={styles.headingText}>Amount</Text>
                    <Text style={styles.detailText}>{`$${amount.toFixed(2)}`}</Text>
                    <Text style={styles.headingText}>Category</Text>
                    <Text style={styles.detailText}>{category}</Text>
                    <Text style={styles.headingText}>Type</Text>
                    <Text style={styles.detailText}>{type}</Text>
                </View>
            </Backdrop>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 15, 
        flex: 1, 
        alignItems: 'center'
    }, 
    headingText: {
        color: colors.DARK_COLOR, 
        fontSize: 14, 
    }, 
    detailText: {
        fontSize: 18, 
        marginBottom: 10
    }
}); 

export default TransactionDetailScreen; 

