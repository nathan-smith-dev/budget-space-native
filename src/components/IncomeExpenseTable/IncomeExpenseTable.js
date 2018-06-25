import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, StyleSheet } from 'react-native'; 
import { Table } from '../Table'; 
import IncomeExpenseTableHeader from './IncomeExpenseTableHeader/IncomeExpenseTableHeader'; 
import IncomeExpenseRow from './IncomeExpenseTableRow/IncomeExpenseTableRow'; 

const incomeExpenseTable = ({ data, incomeHeader, expenseHeader, netHeader }) => {
    return (
        <View style={styles.container}>
            <Table>
                <IncomeExpenseTableHeader 
                    incomeHeader={incomeHeader}
                    expenseHeader={expenseHeader}
                    netHeader={netHeader}
                />
                <IncomeExpenseRow style={{borderBottomWidth: 0}} data={data} />
            </Table>
        </View>
    ); 
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
}); 

incomeExpenseTable.propTypes = {
    data: PropTypes.object.isRequired, 
    incomeHeader: PropTypes.string.isRequired,
    expenseHeader: PropTypes.string.isRequired,
    netHeader: PropTypes.string.isRequired
}; 

export default incomeExpenseTable; 