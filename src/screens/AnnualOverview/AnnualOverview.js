import React, { Component } from 'react'; 
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'; 
import { connect } from 'react-redux';
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import * as colors from '../../assets/styles/colors';
import PercentOverview from '../../components/PercentOverview/PercentOverview'; 
import BarOverview from '../../components/BarOverview/BarOverview'; 
import * as annualTransactionActions from '../../store/actions/annualTransactions'; 

class MonthlyOverviewScreen extends Component {
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
        else if(event.type === 'NavBarButtonPress' && event.id === 'toggleBarChart') {
            this.setState({
                tab: 'bar'
            });
        }
        else if(event.type === 'NavBarButtonPress' && event.id === 'togglePieChart') {
            this.setState({
                tab: 'pie'
            });
        }
    }

    state = {
        tab: 'pie'
    }

    handleOnRefresh = () => {
        const { getCategorizedExpenses, token } = this.props;
        getCategorizedExpenses(token); 
    }
    
    render() {
        const { categorizedExpenses, categorizedExpensesLoading, totalIncomesAndExpense } = this.props;
        const { tab } = this.state; 

        let content = (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" colors={colors.PRIMARY_COLOR} />
            </View>
        ); 
        if(!categorizedExpensesLoading && tab === 'pie') {
            content = (
                <PercentOverview
                    data={categorizedExpenses}
                    onRefresh={this.handleOnRefresh}
                    refreshing={categorizedExpensesLoading}
                />
            ); 
        }
        else if(!categorizedExpensesLoading && tab === 'bar') {
            content = (
                <BarOverview 
                    data={totalIncomesAndExpense}
                />
            ); 
        }

        return (
            <Backdrop>
                <View style={styles.container}>
                    {content}
                </View>
            </Backdrop>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15, 
        flex: 1
    }
}); 

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        categorizedExpenses: state.annualTransactions.categorizedExpenses,
        categorizedExpensesLoading: state.annualTransactions.categorizedExpensesLoading,
        totalIncomesAndExpense: state.annualTransactions.totals
    };
}; 

mapDispatchToProps = dispatch => {
    return {
        getCategorizedExpenses: token => dispatch(annualTransactionActions.getCategorizedExpenses(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyOverviewScreen); 

