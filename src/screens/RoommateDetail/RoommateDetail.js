import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import { connect } from 'react-redux'; 
import TransactionTable from '../../components/TransactionTable/TransactionTable';
import IncomeExpenseTable from '../../components/IncomeExpenseTable/IncomeExpenseTable'; 
import * as colors from '../../assets/styles/colors'; 
import * as apiCalls from '../../apiCalls'; 
import * as roommateActions from '../../store/actions/roommates'; 


class RoommateDetailScreen extends Component {
    static propTypes = {
        roommateId: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props); 

        const { navigator } = props; 
        // console.log(navigator); 
        navigator.setOnNavigatorEvent(this.onNavigatorEvent); 
    }

    onNavigatorEvent = event => {
        const { navigator, roommateId } = this.props; 
        if(event.type === 'NavBarButtonPress' && event.id === 'addRoommateExpenseToggle') {
            navigator.push({
                screen: 'budget-space-native.TransactionFormScreen', 
                title: 'New Roommate Transaction', 
                animated: true, 
                animationType: 'fade', 
                passProps: {
                    isNew: true, 
                    isEdit: false, 
                    isRoommateExpense: true, 
                    roommateId: roommateId
                }
            }); 
        }
    }

    handleOnExpenseSelected = async id => {
        const { mateTransactions, roommateId, navigator, token, getRoommates } = this.props; 
        const transaction = mateTransactions[roommateId].filter(trans => trans.id === id)[0]; 
        navigator.push({
            screen: 'budget-space-native.TransactionDetail', 
            title: 'Roommate Transaction', 
            passProps: {
                ...transaction, 
                editable: transaction.direction === 'To', 
                onDelete: this.handleDeleteTransaction, 
                onEdit: this.handleEditTransaction
            }, 
            animated: true, 
            animationType: 'fade'
        }); 
        if(transaction.direction === 'From') {
            let tries = 0; 
                while (tries < 5) {
                    try {
                        const postedDate = await apiCalls.updateRoommateExpense(token, {...transaction, acknowledged: true, resolved: false}); 
                        // console.log(postedDate.data); 
                        getRoommates(token); 
                        return; 
                    }
                    catch(err) {
                        console.log(err); 
                        tries++; 
                    }
            }
            alert('Error acknowledging roommate expense.'); 
        }
    }

    handleDeleteTransaction = async id => {
        const { navigator, mateTransactions, roommateId, token, getRoommates } = this.props; 
        const transObj = mateTransactions[roommateId].filter(trans => trans.id === id)[0]; 

        let tries = 0; 
            while (tries < 5) {
                try {
                    const postedDate = await apiCalls.updateRoommateExpense(token, {...transObj, resolved: true, acknowledged: true}); 
                    console.log(postedDate.data); 
                    getRoommates(token); 
                    navigator.pop({ animationType: 'fade' }); 
                    return; 
                }
                catch(err) {
                    console.log(err); 
                    tries++; 
                }
        }
        alert('Error deleting roommate expense.'); 
    }

    handleEditTransaction = id => {
        const { navigator, mateTransactions, roommateId } = this.props; 
        navigator.push({
            screen: 'budget-space-native.TransactionFormScreen', 
            title: 'Edit Roommate Transaction', 
            animated: true, 
            animationType: 'fade', 
            passProps: {
                transaction: mateTransactions[roommateId].filter(trans => trans.id === id)[0],
                isNew: false, 
                isEdit: true,
                isRoommateExpense: true, 
                roommateId: roommateId
            }
        }); 
    }

    render() {
        const { mateTransactions, roommateId } = this.props; 
        const thisRoommatesTransactions = mateTransactions && mateTransactions[roommateId] ? mateTransactions[roommateId] : []; 

        let roommateIncomeExpenseObj = {
            incomes: 0, 
            expenses: 0
        };
        thisRoommatesTransactions.map(trans => trans.direction === 'From' ? 
            roommateIncomeExpenseObj.expenses+=trans.amount : 
            roommateIncomeExpenseObj.incomes+=trans.amount); 

        return (
            <Backdrop>
                <View style={styles.container}>
                    <View style={{flex: 1, justifyContent: 'space-between'}}>
                        <View style={{height: '65%'}}>
                            <TransactionTable
                                transactions={thisRoommatesTransactions}
                                onRowPressed={this.handleOnExpenseSelected}
                            />
                        </View>
                        <View style={{height: '20%'}}>
                            <IncomeExpenseTable
                                data={roommateIncomeExpenseObj} 
                                oweTable
                                incomeHeader="To"
                                expenseHeader="From"
                                netHeader={roommateIncomeExpenseObj.incomes > roommateIncomeExpenseObj.expenses ? "You are Owed" : "You Owe"}
                            />
                        </View>
                    </View>
                </View>
            </Backdrop>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 15
    }, 
    subcontainer: {
        flex: 1
    },
    chart: {
        height: 50
    }
}); 

const mapStateToProps = state => {
    return {
        mateTransactions: state.roommates.mateTransactions, 
        token: state.auth.token
    }; 
}; 

mapDispatchToProps = dispatch => {
    return {
        getRoommates: token => dispatch(roommateActions.getRoommates(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoommateDetailScreen); 

