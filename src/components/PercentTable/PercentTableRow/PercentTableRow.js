import React from 'react'; 
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native'; 
import { TableColumn, TableRow } from '../../Table'; 


const percentTableRow = ({ amount, categoryName, percentage, labelColor }) => {
    return (
        <View>
            <TableRow>
                <TableColumn grow={7}>
                    <View style={styles.category}>
                        <View style={[styles.categoryLabel, {backgroundColor: labelColor}]}></View>
                        <Text>{categoryName}</Text>
                    </View>
                </TableColumn>
                <TableColumn grow={3}>
                    <Text style={styles.amountText}>{`$${amount.toFixed(2)}`}</Text>
                </TableColumn>
                <TableColumn grow={2}>
                    <Text style={{textAlign: 'right'}}>{`${Math.round(percentage)}%`}</Text>
                </TableColumn>
            </TableRow>
        </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
        margin: 15
    }, 
    amountText: {
        textAlign: 'right', 
        paddingRight: 15
    }, 
    category: {
        flexDirection: 'row',
        alignItems: 'center'
    }, 
    categoryLabel: {
        height: 10, 
        width: 10, 
        marginRight: 3
    }
}); 

percentTableRow.propTypes = {
    amount: PropTypes.number.isRequired, 
    categoryName: PropTypes.string.isRequired, 
    percentage: PropTypes.number.isRequired, 
    labelColor: PropTypes.string.isRequired
}

export default percentTableRow; 