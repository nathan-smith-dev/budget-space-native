import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, StyleSheet, FlatList } from 'react-native'; 
import * as colors from '../../assets/styles/colors'; 
import { Table, TableColumn, TableRow } from '../Table'; 
import TransactionTableHeader from './TransactionTableHeader/TransactionTableHeader'; 
import TransactionTableRow from './TransactionTableRow/TransactionTableRow'; 

const transTable = ({ transactions }) => {
    return (
        <View style={styles.container}>
            <Table>
                <TransactionTableHeader />
                <FlatList 
                    keyExtractor={item => item.id}
                    data={transactions}
                    renderItem={info => (
                        <TransactionTableRow 
                            date={new Date(info.item.date).toDateString()}
                            amount={info.item.amount}
                            type={info.item.type}
                            categoryName={info.item.category}
                            onPress={() => alert('Pressed id: ' + info.item.id)} 
                        />
                    )}
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
    transactions: PropTypes.array.isRequired
}

export default transTable; 