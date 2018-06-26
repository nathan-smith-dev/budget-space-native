import React, { Component } from 'react'; 
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Backdrop from '../../hoc/Backdrop/Backdrop' ; 
import TransactionTable from '../../components/TransactionTable/TransactionTable'; 
import { connect } from 'react-redux';
import * as apiCalls from '../../apiCalls'; 
import * as transactionActions from '../../store/actions/transactions'; 
import * as colors from '../../assets/styles/colors'; 
export let rootNavigator = null; 

class TransactionsScreen extends Component {
    constructor(props) {
        super(props); 

        const { navigator } = props; 
        rootNavigator = navigator; 
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
            passProps: {
                ...transaction, 
                editable: true, 
                onDelete: this.handleDeleteTransaction, 
                onEdit: this.handleEditTransaction
            }, 
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
            animationType: 'fade', 
            passProps: {
                isNew: true, 
                isEdit: false
            }
        }); 
    }

    handleDeleteTransaction = async (id, type) => {
        let tries = 0; 
        while (tries < 5) {
            try {
                const { token, navigator, getTransactions } = this.props; 
                const deletedTransaction = await apiCalls.deleteTransaction(token, id, type); 
                getTransactions(token); 
                navigator.pop({ animationType: 'fade' });
                return;  
            }
            catch(err) {
                console.log(err); 
                tries++; 
            }
        }
        alert('Error deleting transaction.'); 
    }
    
    handleEditTransaction = (id) => {
        const { navigator, transactions } = this.props; 
        navigator.push({
            screen: 'budget-space-native.TransactionFormScreen', 
            title: 'Edit Transaction', 
            animated: true, 
            animationType: 'fade', 
            passProps: {
                transaction: transactions.filter(trans => trans.id === id)[0],
                isNew: false, 
                isEdit: true
            }
        }); 
    }

    handleOnRefresh = () => {
        const { getTransactions, token, trackedDates } = this.props; 
        getTransactions(token, trackedDates.month, trackedDates.year); 
    }
    
    render() {
        const { transactions, activeFilters, loading } = this.props;

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

        let content = (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" colors={colors.PRIMARY_COLOR} />
            </View>
        );
        if(!loading) {
            content = (
                <TransactionTable 
                    refreshing={loading}
                    onRefresh={this.handleOnRefresh}
                    transactions={filteredTransactions}
                    onRowPressed={this.handleTransactionPressed} 
                    onFilterPressed={this.handleFilterPressed} />
            ); 
        }
        return (
            <Backdrop>
                {content}
            </Backdrop>
        );
    }
}

const styles = StyleSheet.create({
    
}); 

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        transactions: state.transactions.transactions,
        activeFilters: state.transactions.filters.activeFilters, 
        loading: state.transactions.loading,
        trackedDates: state.transactions.trackedDates,
    };
}; 

const mapDispatchToProps = dispatch => {
    return {
        getTransactions: token => dispatch(transactionActions.getTransactions(token)), 
    }; 
}; 

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen); 

