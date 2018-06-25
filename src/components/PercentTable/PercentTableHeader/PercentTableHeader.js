import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, Text, StyleSheet } from 'react-native'; 
import * as colors from '../../../assets/styles/colors'; 
import { TableColumn, TableRow } from '../../Table'; 

const percentTableHeader = (props) => {
    return (
        <TableRow>
            <TableColumn grow={7}>
                <Text style={styles.headingText}>Category</Text>
            </TableColumn>
            <TableColumn grow={3}>
                <Text style={[styles.headingText, {textAlign: 'right', paddingRight: 15}]}>Amount</Text>
            </TableColumn>
            <TableColumn grow={2}>
                <View>
                    <Text style={styles.headingText}>Percent</Text>
                </View>
            </TableColumn>
        </TableRow>
    ); 
}

const styles = StyleSheet.create({
    headingText: {
        color: colors.DARK_COLOR
    }
});

percentTableHeader.propTypes = {
    
}; 

export default percentTableHeader; 