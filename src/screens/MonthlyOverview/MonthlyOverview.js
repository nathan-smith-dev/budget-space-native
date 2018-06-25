import React, { Component } from 'react'; 
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'; 
import { connect } from 'react-redux';
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import * as colors from '../../assets/styles/colors';
import PercentOverview from '../../components/PercentOverview/PercentOverview'; 
import * as transactionActions from '../../store/actions/transactions'; 

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
    }

    handleOnRefresh = () => {
        const { getCategorizedExpenses, token } = this.props;
        getCategorizedExpenses(token); 
    }
    
    render() {
        const { categorizedExpenses, categorizedExpensesLoading } = this.props;

        let content = (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" colors={colors.PRIMARY_COLOR} />
            </View>
        ); 
        if(!categorizedExpensesLoading) {
            content = (
                <PercentOverview
                    data={categorizedExpenses}
                    onRefresh={this.handleOnRefresh}
                    refreshing={categorizedExpensesLoading}
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
        categorizedExpenses: state.transactions.categorizedExpenses,
        categorizedExpensesLoading: state.transactions.categorizedExpensesLoading,
    };
}; 

mapDispatchToProps = dispatch => {
    return {
        getCategorizedExpenses: token => dispatch(transactionActions.getCategorizedExpenses(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyOverviewScreen); 

