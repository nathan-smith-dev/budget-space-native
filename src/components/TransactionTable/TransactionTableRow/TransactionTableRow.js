import React from 'react'; 
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native'; 
import * as colors from '../../../assets/styles/colors'; 
import { TableColumn, TableRow } from '../../Table'; 
import Touchable from '../../../hoc/Touchable/Touchable'; 


const transTableRow = ({ date, amount, type, categoryName, onPress }) => {
    return (
        <Touchable onPress={onPress}>
            <View>
                <TableRow>
                    <TableColumn grow={2}>
                        <Text>{date}</Text>
                    </TableColumn>
                    <TableColumn grow={3}>
                        <Text style={styles.amountText}>{amount}</Text>
                    </TableColumn>
                    <TableColumn grow={7}>
                        <Text style={{marginLeft: 15}}>{categoryName}</Text>
                    </TableColumn>
                </TableRow>
            </View>
        </Touchable>
    ); 
}

const styles = StyleSheet.create({
    container: {
        margin: 15
    }, 
    amountText: {
        textAlign: 'right', 
        color: 'red'
    }
}); 

transTableRow.propTypes = {
    onPress: PropTypes.func.isRequired, 
    date: PropTypes.string.isRequired, 
    amount: PropTypes.number.isRequired, 
    type: PropTypes.string.isRequired, 
    categoryName: PropTypes.string.isRequired
}

export default transTableRow; 