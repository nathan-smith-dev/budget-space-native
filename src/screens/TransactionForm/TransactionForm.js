import React, { Component } from 'react'; 
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import { connect } from 'react-redux'; 
import Dropdown from '../../components/Dropdown/Dropdown'; 
import DatePicker from '../../components/DatePicker/DatePicker'; 
import NewCategory from '../../components/NewCategory/NewCategory'; 
import * as colors from '../../assets/styles/colors'; 
import NumericInput from '../../components/NumericInput/NumericInput'; 
import TextInput from '../../components/TextInput/TextInput'; 
import ButtonOutline from '../../components/ButtonOutline/ButtonOutline'; 
import moment from 'moment'; 
import * as apiCalls from '../../apiCalls'; 
import * as transactionActions from '../../store/actions/transactions'; 
import * as roommateActions from '../../store/actions/roommates'; 

class TransactionFormScreen extends Component {
    state = {
        date: {
            value: moment(),
            valid: true
        },
        categoryId: {
            value: null, 
            valid: false,
            touched: false
        }, 
        type: {
            value: 'expense',
            valid: true
        }, 
        amount: {
            value: null, 
            valid: false, 
            touched: false
        }, 
        description: {
            value: '', 
            valid: true
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.isNew) return {...prevState}; 
        
        else if(nextProps.isEdit) {
            return {
                ...prevState,
                date: {
                    value: moment(nextProps.transaction.date),
                    valid: true
                },
                categoryId: {
                    value: nextProps.transaction.categoryId, 
                    valid: true,
                    touched: false
                }, 
                type: {
                    value: nextProps.transaction.type.toLowerCase(),
                    valid: true
                }, 
                amount: {
                    value: nextProps.transaction.amount.toFixed(2), 
                    valid: true, 
                    touched: false
                }, 
                description: {
                    value: nextProps.transaction.desc, 
                    valid: true
                }
            }
        }
    }

    handleOnDateChange = date => {
        this.setState(prevState => {
            return{
                date: {
                    ...prevState.date, 
                    value: date
                }
            }
        }); 
    }

    handleOnCategoryChange = catId => {
        this.setState(prevState => {
            return{
                categoryId: {
                    ...prevState.categoryId, 
                    value: catId, 
                    touched: true, 
                    valid: true
                }
            }
        }); 
    }

    handleTypeChange = type => {
        this.setState(prevState => {
            return{
                type: {
                    ...prevState.type, 
                    value: type
                }
            }
        }); 
    }

    handleAmountChange = amount => {
        this.setState(prevState => {
            return{
                amount: {
                    ...prevState.amount, 
                    value: amount, 
                    touched: true, 
                    valid: amount !== ''
                }
            }
        }); 
    }

    handleDescChange = text => {
        this.setState(prevState => {
            return{
                description: {
                    ...prevState.description, 
                    value: text
                }
            }
        }); 
    }

    isStateFormsValid = () => {
        const { amount, categoryId } = this.state; 
        if(amount.valid && categoryId.valid) return true; 
        else {
            this.setState(prevState => {
                return {
                    amount: {
                        ...prevState.amount, 
                        touched: true
                    }, 
                    categoryId: {
                        ...prevState.categoryId, 
                        touched: true
                    }
                }
            }); 
        }
        return false; 
    }

    handleOnSubmit = () => {
        if(!this.isStateFormsValid()) return; 

        const { isNew, isEdit } = this.props;
        if(isNew) this.sendNewTransaction(); 
        else if(isEdit) this.updateTransaction(); 
    }

    handleOnNewCategory = () => {
        alert('Hanlde new category'); 
    }

    sendNewTransaction = async () => {
        const { amount, date, description, categoryId, type } = this.state;
        const { token, getTransactions, navigator, roommateId, isRoommateExpense, getRoommates } = this.props;
        const transObj = {
            amount: parseFloat(amount.value), // send as a number 
            date: date.value.toDate(),
            desc: description.value, 
            categoryId: categoryId.value,
            type: type.value
        }; 
        // console.log(transObj); 

        if(isRoommateExpense) {
            const roommateTransObj = {
                ...transObj, 
                resolved: false, 
                roommateId: roommateId, 
                acknowledged: false
            }; 

            let tries = 0; 
            while (tries < 5) {
                try {
                    const postedDate = await apiCalls.createRoommateExpense(token, roommateTransObj); 
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
        }
        else {
            let tries = 0; 
            while (tries < 5) {
                try {
                    const postedDate = await apiCalls.createTransaction(token, transObj); 
                    console.log(postedDate.data); 
                    getTransactions(token); 
                    navigator.pop({ animationType: 'fade' }); 
                    return; 
                }
                catch(err) {
                    console.log(err); 
                    tries++; 
                }
            }
        }
        alert('Failed sending new transaction.'); 
    }

    updateTransaction = async () => {
        const { amount, date, description, categoryId, type } = this.state;
        const { token, getTransactions, navigator, roommateId, isRoommateExpense, getRoommates } = this.props;
        const { id } = this.props.transaction; 
        console.log(type); 

        const transObj = {
            id: id,
            amount: parseFloat(amount.value), // send as a number 
            date: date.value.toDate(),
            desc: description.value, 
            categoryId: categoryId.value, 
            type: type.value
        }; 

        if(isRoommateExpense) {
            const roommateTransObj = {
                ...transObj, 
                resolved: false, 
                roommateId: roommateId, 
                acknowledged: false
            }; 

            let tries = 0; 
            while (tries < 5) {
                try {
                    const postedDate = await apiCalls.updateRoommateExpense(token, roommateTransObj); 
                    console.log(postedDate.data); 
                    getRoommates(token); 
                    navigator.pop({ animationType: 'fade' }); 
                    navigator.pop({ animationType: 'fade' }); 
                    return; 
                }
                catch(err) {
                    console.log(err); 
                    tries++; 
                }
            }
            alert('Failed updating roommate transaction.'); 
        }
        else {
            let tries = 0; 
            while (tries < 5) {
                try {
                    const postedDate = await apiCalls.updateTransaction(token, transObj); 
                    navigator.pop({ animationType: 'fade' }); 
                    navigator.pop({ animationType: 'fade' }); 
                    getTransactions(token); 
                    return; 
                }
                catch(err) {
                    console.log(err); 
                    tries++; 
                }
            }
            alert('Failed updating transaction.'); 
        }
    }

    render() {
        const { date, categoryId, type, amount, description } = this.state;
        const { categories } = this.props; 
        const categoryData = categories.map(cat => {return {value: cat.id, label: cat.category}});
    
        return (
            <Backdrop>
                <KeyboardAvoidingView style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView>
                            <View>
                                <View style={styles.formContainer}>
                                    <Text style={styles.label}>Date</Text>
                                    <DatePicker 
                                        selectedDate={date.value}
                                        color={colors.PRIMARY_COLOR}
                                        textColor={colors.LIGHT_COLOR}
                                        dayHeaderColor={colors.SECONDARY_COLOR}
                                        onChange={this.handleOnDateChange}
                                    />
                                </View>
                                <View style={styles.formContainer}>
                                    <Text style={styles.label}>Type</Text>
                                    <Dropdown
                                        value={type.value}
                                        data={[{value: 'expense', label: 'Expense'}, {value: 'income', label: 'Income'}]}
                                        color={colors.PRIMARY_COLOR}
                                        onSelect={this.handleTypeChange}
                                        placeholder="Select Type"
                                        size={14}
                                    />
                                </View>
                                <View style={styles.formContainer}>
                                    <Text style={styles.label}>Amount</Text>
                                    <NumericInput
                                        style={!amount.valid && amount.touched ? invalidStyle : null}
                                        size={14}
                                        color={colors.PRIMARY_COLOR}
                                        placeholder="0.00"
                                        onChange={this.handleAmountChange}
                                        value={amount.value}
                                    />
                                </View>
                                <View style={styles.formContainer}>
                                    <Text style={styles.label}>Category</Text>
                                    <View style={styles.categoryContainer}>
                                        <View style={{width: '85%'}}>
                                            <Dropdown 
                                                style={!categoryId.valid && categoryId.touched ? invalidStyle : null}
                                                value={categoryId.value}
                                                data={categoryData}
                                                color={colors.PRIMARY_COLOR}
                                                onSelect={this.handleOnCategoryChange}
                                                placeholder="Select Category"
                                                size={14}
                                            />
                                        </View>
                                        <NewCategory />
                                    </View>
                                </View>
                                <View style={styles.formContainer}>
                                    <Text style={styles.label}>Description</Text>
                                    <TextInput
                                        size={14}
                                        color={colors.PRIMARY_COLOR}
                                        placeholder="Description"
                                        onChange={this.handleDescChange}
                                        value={description.value}
                                    />
                                </View>
                            </View>
                            <View style={styles.submitButton}>
                                <ButtonOutline 
                                    iconRight="ios-checkmark"
                                    size={14}
                                    color={colors.SUCCESS_COLOR}
                                    text="Submit"
                                    onPress={this.handleOnSubmit}
                                />
                            </View>
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </Backdrop>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 15, 
        flex: 1,
        justifyContent: 'space-between'
    }, 
    label: {
        color: colors.DARK_COLOR, 
        fontSize: 12, 
        marginBottom: 2
    }, 
    formContainer: {
        marginBottom: 10
    }, 
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center'
    }, 
    submitButton: {
        marginTop: 20, 
        alignSelf: 'center'
    }
}); 

const invalidStyle = {
    borderColor: colors.DANGER_COLOR, 
    backgroundColor: colors.DANGER_SECONDARY_COLOR
}; 

mapStateToProps = state => {
    return {
        categories: state.transactions.categories, 
        token: state.auth.token
    };
}; 

mapDispatchToProps = dispatch => {
    return {
        getTransactions: token => dispatch(transactionActions.getTransactions(token)), 
        getRoommates: token => dispatch(roommateActions.getRoommates(token))
    };
}; 

export default connect(mapStateToProps, mapDispatchToProps)(TransactionFormScreen); 