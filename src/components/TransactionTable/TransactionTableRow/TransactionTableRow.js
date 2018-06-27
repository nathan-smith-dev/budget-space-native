import React from 'react'; 
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native'; 
import * as colors from '../../../assets/styles/colors'; 
import { TableColumn, TableRow } from '../../Table'; 
import Touchable from '../../../hoc/Touchable/Touchable'; 
import { formatDate } from '../../../utilities';


const transTableRow = ({ date, amount, type, categoryName, onPress, direction, border, highlight }) => {

    const tableRowStyles = {
        backgroundColor: highlight ? colors.SECONDARY_COLOR : 'transparent',
        borderBottomWidth: !border ? 0 : 1
    };
    return (
        <Touchable onPress={onPress}>
            <View>
                <TableRow style={tableRowStyles}>
                    <TableColumn grow={2}>
                        <Text>{formatDate(date)}</Text>
                    </TableColumn>
                    <TableColumn grow={3}>
                        <Text style={[styles.amountText, {color: getTransactionColor(type, direction)}]}>{amount.toFixed(2)}</Text>
                    </TableColumn>
                    <TableColumn grow={7}>
                        <Text style={{marginLeft: 15}}>{categoryName}</Text>
                    </TableColumn>
                </TableRow>
            </View>
        </Touchable>
    ); 
}

const getTransactionColor = (type, direction) => {
    if(direction) {
        return direction === 'From' ? colors.DANGER_COLOR : colors.SUCCESS_COLOR
    }
    else {
        return type === 'Expense' ? colors.DANGER_COLOR : colors.SUCCESS_COLOR; 
    }
}; 

const styles = StyleSheet.create({
    container: {
        margin: 15
    }, 
    amountText: {
        textAlign: 'right'
    }
}); 

transTableRow.propTypes = {
    onPress: PropTypes.func.isRequired, 
    date: PropTypes.instanceOf(Date).isRequired, 
    amount: PropTypes.number.isRequired, 
    type: PropTypes.string.isRequired, 
    categoryName: PropTypes.string.isRequired,
    direction: PropTypes.string, 
    border: PropTypes.bool.isRequired,
    highlight: PropTypes.bool
}

export default transTableRow; 