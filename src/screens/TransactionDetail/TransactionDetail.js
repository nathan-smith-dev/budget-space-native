import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import * as colors from '../../assets/styles/colors'; 
import ButtonOutline from '../../components/ButtonOutline/ButtonOutline'; 

class TransactionDetailScreen extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired, 
        amount: PropTypes.number.isRequired, 
        date: PropTypes.instanceOf(Date).isRequired, 
        type: PropTypes.string.isRequired, 
        category: PropTypes.string.isRequired, 
        editable: PropTypes.bool.isRequired,
        onDelete: PropTypes.func, 
        onEdit: PropTypes.func
    }

    render() {
        const { id, amount, date, category, type, desc, editable, onEdit, onDelete } = this.props; 
        let buttons = null; 
        if(editable) {
            buttons = (
                <View style={styles.buttonContainer}>
                    <ButtonOutline 
                        text="Edit" 
                        size={14}
                        iconRight="md-create" 
                        color={colors.PRIMARY_COLOR}
                        onPress={() => onEdit(id)} />
                    <ButtonOutline 
                        text="Delete" 
                        size={14}
                        iconRight="ios-trash" 
                        color={colors.DANGER_COLOR}
                        onPress={() => onDelete(id, type)} />
                </View>
            ); 
        }

        return (
            <Backdrop>
                <View style={styles.container}>
                    <View style={styles.detailContainer}>
                        <Text style={styles.headingText}>Date</Text>
                        <Text style={styles.detailText}>{date.toLocaleDateString('en-us')}</Text>
                        <Text style={styles.headingText}>Amount</Text>
                        <Text style={styles.detailText}>{`$${amount.toFixed(2)}`}</Text>
                        <Text style={styles.headingText}>Category</Text>
                        <Text style={styles.detailText}>{category}</Text>
                        <Text style={styles.headingText}>Type</Text>
                        <Text style={styles.detailText}>{type}</Text>
                        <Text style={styles.headingText}>Description</Text>
                        <Text style={styles.detailText}>{desc}</Text>
                    </View>
                    {buttons}
                </View>
            </Backdrop>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 15, 
        flex: 1, 
        justifyContent: 'space-between'
    }, 
    detailContainer: {
        alignItems: 'center'
    }, 
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around'
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

