import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import { connect } from 'react-redux'; 
import TransactionTable from '../../components/TransactionTable/TransactionTable';
import IncomeExpenseTable from '../../components/IncomeExpenseTable/IncomeExpenseTable'; 
import * as colors from '../../assets/styles/colors'; 


class RoommateDetailScreen extends Component {
    static propTypes = {
        roommateId: PropTypes.string.isRequired
    }

    render() {
        const { mateTransactions, roommateId } = this.props; 
        const thisRoommatesTransactions = mateTransactions[roommateId] ? mateTransactions[roommateId] : []; 

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
                                onRowPressed={id => console.log(id)}
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
        mateTransactions: state.roommates.mateTransactions
    }; 
}; 

export default connect(mapStateToProps)(RoommateDetailScreen); 

