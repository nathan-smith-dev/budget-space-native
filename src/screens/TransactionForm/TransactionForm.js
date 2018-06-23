import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import { connect } from 'react-redux'; 
import Dropdown from '../../components/Dropdown/Dropdown'; 
import DatePicker from '../../components/DatePicker/DatePicker'; 
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon'; 
import * as colors from '../../assets/styles/colors'; 
import NumericInput from '../../components/NumericInput/NumericInput'; 
import TextInput from '../../components/TextInput/TextInput'; 
import ButtonOutline from '../../components/ButtonOutline/ButtonOutline'; 
import moment from 'moment'; 

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
            value: null, 
            valid: true
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
                    valid: true
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
        if(amount.valid || categoryId.valid) return true; 
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

    render() {
        const { date, categoryId, type, amount, description } = this.state;
        const { categories } = this.props; 
        const categoryData = categories.map(cat => {return {value: cat.id, label: cat.category}});
    
        return (
            <Backdrop>
                <View style={styles.container}>
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
                                <ButtonIcon 
                                    icon="md-add-circle"
                                    size={30}
                                    onPress={() => alert('Handle new csategory')}
                                    color={colors.PRIMARY_COLOR} 
                                />
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
                            onPress={() => this.isStateFormsValid()}
                        />
                    </View>
                </View>
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
        alignSelf: 'center'
    }
}); 

const invalidStyle = {
    borderColor: colors.DANGER_COLOR, 
    backgroundColor: colors.DANGER_SECONDARY_COLOR
}; 

mapStateToProps = state => {
    return {
        categories: state.transactions.categories
    }
}

mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionFormScreen); 