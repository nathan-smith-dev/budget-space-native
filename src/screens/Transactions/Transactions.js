import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native';
import Backdrop from '../../hoc/Backdrop/Backdrop' ; 
import TransactionTable from '../../components/TransactionTable/TransactionTable'; 
import { connect } from 'react-redux';

class TransactionsScreen extends Component {
    constructor(props) {
        super(props); 

        const { navigator } = props; 
        // console.log(navigator); 
        navigator.setOnNavigatorEvent(this.onNavigatorEvent); 
    }

    onNavigatorEvent = event => {
        const { navigator } = this.props; 
        if(event.type === 'NavBarButtonPress' && event.id === 'sideDrawerToggle') {
            navigator.toggleDrawer({
                side: 'left'
            }); 
        }
        else if(event.type === 'NavBarButtonPress' && event.id === 'addExpenseToggle') {
            this.handleCreateTransaction(); 
        }
    }

    handleFilterPressed = () => {
        const { navigator } = this.props; 
        navigator.push({
            screen: 'budget-space-native.FilterScreen', 
            title: 'Filter Settings', 
            passProps: {}, 
            animated: true, 
            animationType: 'fade'
        }); 
    }

    handleTransactionPressed = id => {
        const { navigator, transactions } = this.props; 
        const transaction = transactions.find(trans => trans.id === id); 
        navigator.push({
            screen: 'budget-space-native.TransactionDetail', 
            title: 'Transaction Detail', 
            passProps: {...transaction}, 
            animated: true, 
            animationType: 'fade'
        }); 
    }

    handleCreateTransaction = () => {
        const { navigator } = this.props; 
        navigator.push({
            screen: 'budget-space-native.TransactionFormScreen', 
            title: 'New Transaction', 
            animated: true, 
            animationType: 'fade'
        }); 
    }
    
    render() {
        const { transactions, activeFilters } = this.props;

        // Apply Filters
        let filteredTransactions = transactions; 
        if(activeFilters.primaryFilter !== 'none' && activeFilters.secondaryFilter !== 'none') {
            if(activeFilters.primaryFilter === 'category') {
                filteredTransactions = transactions.filter(
                    trans => trans[activeFilters.primaryFilter] === activeFilters.secondaryFilter
                );  
            }
            else if(activeFilters.primaryFilter === 'date') {
                filteredTransactions = transactions.filter( // this is ugly but apparently dates wont compare so compare their strings
                    trans => new Date(trans[activeFilters.primaryFilter]).toDateString() === new Date(activeFilters.secondaryFilter).toDateString()
                ); 
            }
        }
        return (
            <Backdrop>
                <TransactionTable 
                    transactions={filteredTransactions}
                    onRowPressed={this.handleTransactionPressed} 
                    onFilterPressed={this.handleFilterPressed} />
            </Backdrop>
        );
    }
}

const styles = StyleSheet.create({
    
}); 

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
        transactions: state.transactions.transactions,
        activeFilters: state.transactions.filters.activeFilters
    }
}

export default connect(mapStateToProps)(TransactionsScreen); 

