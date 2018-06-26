import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 
import { View, StyleSheet, Modal, Text } from 'react-native'; 
import { connect } from 'react-redux'; 
import ButtonIcon from '../ButtonIcon/ButtonIcon'; 
import ButtonOutline from '../ButtonOutline/ButtonOutline'; 
import TextInput from '../TextInput/TextInput'; 
import * as colors from '../../assets/styles/colors'; 
import * as apiCalls from '../../apiCalls'; 
import * as transactionActions from '../../store/actions/transactions'; 

class NewCategory extends Component {
    static propTypes = {

    }

    state = {
        modalVisible: false, 
        categoryName: '', 
        valid: false,
        touched: false
    }

    handleToggleModal = () => {
        this.setState(prevState => {
            return {
                modalVisible: !prevState.modalVisible
            }
        }); 
    }
    
    handleOnCategoryChange = text => {
        this.setState(prevState => {
            return {
                categoryName: text, 
                touched: true, 
                valid: text !== ''
            }
        }); 
    }

    handleOnCategorySubmit = async () => {
        const { valid, categoryName } = this.state; 
        const { getUserCategories, token } = this.props; 
        
        if(valid) {
            let tries = 0; 
            while (tries < 5) {
                try {
                    const result = await apiCalls.createUserCategory(token, categoryName); 
                    getUserCategories(token); 
                    this.handleToggleModal(); 
                    return; 
                }
                catch(err) {
                    console.log(err); 
                    tries++; 
                }
            }
            alert('Error creating category.'); 
        }
        else {
            this.setState({
                touched: true
            }); 
        }
    }

    render() {
        const { modalVisible, categoryName, valid, touched } = this.state; 

        return (
            <View>
                <ButtonIcon 
                    icon="md-add-circle"
                    size={30}
                    onPress={this.handleToggleModal}
                    color={colors.PRIMARY_COLOR} 
                />
                <Modal
                        visible={modalVisible}
                        onRequestClose={this.handleToggleModal}
                        transparent={false}
                        animationType="slide"
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.headerText}>New Category</Text>
                                <View style={!valid && touched ? styles.invalid : null}>
                                    <TextInput 
                                        placeholder="Category Name"
                                        value={categoryName}
                                        onChange={this.handleOnCategoryChange}
                                        size={14}
                                        color={!valid && touched ? colors.DANGER_COLOR : colors.PRIMARY_COLOR}
                                    />
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <ButtonOutline 
                                    text="Submit"
                                    color={colors.SUCCESS_COLOR}
                                    iconRight="ios-checkmark"
                                    size={14}
                                    onPress={this.handleOnCategorySubmit}
                                />
                                <ButtonOutline 
                                    text="Cancel"
                                    color={colors.DANGER_COLOR}
                                    iconRight="ios-close"
                                    size={14}
                                    onPress={this.handleToggleModal}
                                />
                            </View>
                        </View>
                    </Modal>
            </View>
        );
    }
}; 

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        margin: 15,
        marginTop: 50, 
        justifyContent: 'space-between'
    }, 
    headerText: {
        color: colors.DARK_COLOR, 
        marginBottom: 2, 
        fontSize: 14
    }, 
    textContainer: {
        width: '75%'
    }, 
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around'
    }, 
    invalid: {
        borderWidth: 1, 
        borderRadius: 5, 
        backgroundColor: colors.DANGER_COLOR_MEDIUM, 
        borderColor: colors.DANGER_COLOR
    }
}); 

const invalidStyle = {
    borderColor: colors.DANGER_COLOR, 
    backgroundColor: colors.DANGER_SECONDARY_COLOR
}; 

mapStateToProps = state => {
    return {
        token: state.auth.token
    };
}; 

mapDispatchToProps = dispatch => {
    return {
        getUserCategories: token => dispatch(transactionActions.getUserCategories(token))
    };
}; 

export default connect(mapStateToProps, mapDispatchToProps)(NewCategory); 