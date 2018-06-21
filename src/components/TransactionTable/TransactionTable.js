import React from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import * as colors from '../../assets/styles/colors'; 
import { Table, TableColumn, TableRow } from '../Table'; 

const transTable = (props) => {
    return (
        <View style={styles.container}>
            <Table>
                {/* Header */}
                <TableRow>
                    <TableColumn grow={2}>
                        <Text style={styles.headingText}>Date</Text>
                    </TableColumn>
                    <TableColumn grow={3}>
                        <Text style={[styles.headingText, {textAlign: 'right'}]}>Amount</Text>
                    </TableColumn>
                    <TableColumn grow={7}>
                        <Text style={[styles.headingText, {marginLeft: 15}]}>Category</Text>
                    </TableColumn>
                </TableRow>
                {/* Body */}
                <TableRow>
                    <TableColumn grow={2}>
                        <Text>6-20</Text>
                    </TableColumn>
                    <TableColumn grow={3}>
                        <Text style={styles.amountText}>315.00</Text>
                    </TableColumn>
                    <TableColumn grow={7}>
                        <Text style={{marginLeft: 15}}>Development</Text>
                    </TableColumn>
                </TableRow>
            </Table>
        </View>
    ); 
}; 

const styles = StyleSheet.create({
    container: {
        margin: 15
    }, 
    headingText: {
        color: colors.DARK_COLOR
    }, 
    amountText: {
        textAlign: 'right', 
        color: 'red'
    }
})

export default transTable; 