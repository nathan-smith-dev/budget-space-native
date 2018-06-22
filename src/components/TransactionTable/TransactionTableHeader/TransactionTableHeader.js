import React from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import * as colors from '../../../assets/styles/colors'; 
import { TableColumn, TableRow } from '../../Table'; 
import ButtonIcon from '../../ButtonIcon/ButtonIcon'; 

const transTableHeader = (props) => {
    return (
        <TableRow>
            <TableColumn grow={2}>
                <Text style={styles.headingText}>Date</Text>
            </TableColumn>
            <TableColumn grow={3}>
                <Text style={[styles.headingText, {textAlign: 'right'}]}>Amount</Text>
            </TableColumn>
            <TableColumn grow={7}>
                <View style={styles.filterContainer}>
                    <Text style={[styles.headingText, {marginLeft: 15}]}>Category</Text>
                    <ButtonIcon 
                        icon="ios-funnel" 
                        color={colors.PRIMARY_COLOR} 
                        size={20}
                        onPress={() => alert('Handle filter')} />
                </View>
            </TableColumn>
        </TableRow>
    ); 
}

const styles = StyleSheet.create({
    headingText: {
        color: colors.DARK_COLOR
    }, 
    filterContainer: {
        justifyContent: 'space-between', 
        flexDirection: 'row'
    }
}); 

export default transTableHeader; 