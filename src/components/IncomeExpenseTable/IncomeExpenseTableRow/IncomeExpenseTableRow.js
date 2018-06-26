import React from 'react'; 
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native'; 
import { TableColumn, TableRow } from '../../Table'; 
import * as colors from '../../../assets/styles/colors';


const incomeExpenseRow = ({ data, style, oweTable }) => {
    const net = (data.incomes - data.expenses); 

    let content = <Text style={{color: net >= 0 ? colors.SUCCESS_COLOR : colors.DANGER_COLOR}}>{`$${net.toFixed(2)}`}</Text>; 
    if(oweTable) {
        content = <Text style={{color: net >= 0 ? colors.SUCCESS_COLOR : colors.DANGER_COLOR}}>{`$${Math.abs(net.toFixed(2))}`}</Text>;
    }

    return (
        <View>
            <TableRow style={{...style}}>
                <TableColumn grow={1}>
                    <Text style={{color: colors.SUCCESS_COLOR}}>{`$${data.incomes.toFixed(2)}`}</Text>
                </TableColumn>
                <TableColumn grow={1}>
                    <Text style={{color: colors.DANGER_COLOR}}>{`$${data.expenses.toFixed(2)}`}</Text>
                </TableColumn>
                <TableColumn grow={1}>
                    {content}
                </TableColumn>
            </TableRow>
        </View>
    ); 
}

const styles = StyleSheet.create({
    
}); 

incomeExpenseRow.propTypes = {
    data: PropTypes.object.isRequired, 
    style: PropTypes.object,
    oweTable: PropTypes.bool
}

export default incomeExpenseRow; 