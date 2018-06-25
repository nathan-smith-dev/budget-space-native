import React from 'react'; 
import PropTypes from 'prop-types'; 
import { Text, StyleSheet } from 'react-native'; 
import * as colors from '../../../assets/styles/colors'; 
import { TableColumn, TableRow } from '../../Table'; 

const incomeExpenseHeader = ({ incomeHeader, expenseHeader, netHeader }) => {
    return (
        <TableRow>
            <TableColumn grow={1}>
                <Text style={styles.headingText}>{incomeHeader}</Text>
            </TableColumn>
            <TableColumn grow={1}>
                <Text style={styles.headingText}>{expenseHeader}</Text>
            </TableColumn>
            <TableColumn grow={1}>
                <Text style={styles.headingText}>{netHeader}</Text>
            </TableColumn>
        </TableRow>
    ); 
}

const styles = StyleSheet.create({
    headingText: {
        color: colors.DARK_COLOR
    }
});

incomeExpenseHeader.propTypes = {
    incomeHeader: PropTypes.string.isRequired,
    expenseHeader: PropTypes.string.isRequired,
    netHeader: PropTypes.string.isRequired
}; 

export default incomeExpenseHeader; 