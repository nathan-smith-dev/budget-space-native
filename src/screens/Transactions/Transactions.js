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
    }
    
    render() {
        const { transactions } = this.props; 
        return (
            <Backdrop>
                <TransactionTable transactions={transactions} />
            </Backdrop>
        );
    }
}

const styles = StyleSheet.create({
    
})

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
        transactions: state.transactions.transactions,
    }
}

export default connect(mapStateToProps)(TransactionsScreen); 

