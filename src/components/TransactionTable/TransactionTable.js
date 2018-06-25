import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native'; 
import * as colors from '../../assets/styles/colors'; 
import { Table, TableColumn, TableRow } from '../Table'; 
import TransactionTableHeader from './TransactionTableHeader/TransactionTableHeader'; 
import TransactionTableRow from './TransactionTableRow/TransactionTableRow'; 

const transTable = ({ transactions, onRowPressed, onFilterPressed, refreshing, onRefresh }) => {
    return (
        <View style={styles.container}>
            <Table>
                <TransactionTableHeader onFilterPressed={onFilterPressed} />
                <FlatList 
                    keyExtractor={item => item.id}
                    data={transactions}
                    renderItem={info => (
                        <TransactionTableRow 
                            date={info.item.date}
                            amount={info.item.amount}
                            type={info.item.type}
                            categoryName={info.item.category}
                            onPress={() => onRowPressed(info.item.id)} 
                        />
                    )}
                    refreshControl={
                        <RefreshControl 
                            colors={[colors.PRIMARY_COLOR]} 
                            tintColor={colors.PRIMARY_COLOR} 
                            refreshing={refreshing}
                            onRefresh={onRefresh} />
                    }
                />
                
            </Table>
        </View>
    ); 
}; 

const styles = StyleSheet.create({
    container: {
        margin: 15
    }
}); 

transTable.propTypes = {
    transactions: PropTypes.array.isRequired, 
    onRowPressed: PropTypes.func.isRequired,
    onFilterPressed: PropTypes.func.isRequired,
    refreshing: PropTypes.bool, 
    onRefresh: PropTypes.func
}; 

export default transTable; 