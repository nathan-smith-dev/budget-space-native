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
                    <View style={styles.subcontainer}>
                        <View style={{margin: 15, marginTop: 0, height: 50}}>
                            <IncomeExpenseTable
                                data={roommateIncomeExpenseObj} 
                                oweTable
                                incomeHeader="To"
                                expenseHeader="From"
                                netHeader={roommateIncomeExpenseObj.incomes > roommateIncomeExpenseObj.expenses ? "You are Owed" : "You Owe"}
                            />
                        </View>
                        <View style={styles.subcontainer}>
                            <TransactionTable
                                transactions={thisRoommatesTransactions}
                                onRowPressed={id => console.log(id)}
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
        padding: 15, 
        flex: 1
    }, 
    subcontainer: {
        flex: 1
    }
}); 

const mapStateToProps = state => {
    return {
        mateTransactions: state.roommates.mateTransactions
    }; 
}; 

export default connect(mapStateToProps)(RoommateDetailScreen); 

