import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native'; 
import * as colors from '../../assets/styles/colors'; 
import { Table, TableColumn, TableRow } from '../Table'; 
import TransactionTableHeader from './TransactionTableHeader/TransactionTableHeader'; 
import TransactionTableRow from './TransactionTableRow/TransactionTableRow'; 

const transTable = ({ transactions, onRowPressed, onFilterPressed, refreshing, onRefresh }) => {
    let refreshControl = null; 
    if(onRefresh) {
        refreshControl = (
            <RefreshControl 
                colors={[colors.PRIMARY_COLOR]} 
                tintColor={colors.PRIMARY_COLOR} 
                refreshing={refreshing}
                onRefresh={onRefresh} />
        ); 
    }

    return (
        <View style={styles.container}>
            <Table>
                <TransactionTableHeader onFilterPressed={onFilterPressed} />
                <FlatList 
                    keyExtractor={item => item.id}
                    data={transactions}
                    renderItem={info => (
                        <TransactionTableRow 
                            border={info.index !== transactions.length-1}
                            highlight={typeof info.item.acknowledged !== 'undefined' && !info.item.acknowledged && info.item.direction === 'From'}
                            date={info.item.date}
                            amount={info.item.amount}
                            type={info.item.type}
                            direction={info.item.direction}
                            categoryName={info.item.category}
                            onPress={() => onRowPressed(info.item.id)} 
                        />
                    )}
                    refreshControl={refreshControl}
                />
                
            </Table>
        </View>
    ); 
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
}); 

transTable.propTypes = {
    transactions: PropTypes.array.isRequired, 
    onRowPressed: PropTypes.func.isRequired,
    onFilterPressed: PropTypes.func,
    refreshing: PropTypes.bool, 
    onRefresh: PropTypes.func
}; 

export default transTable; 