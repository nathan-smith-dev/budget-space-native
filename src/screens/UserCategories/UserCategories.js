import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon'; 
import * as colors from '../../assets/styles/colors';
import { connect } from 'react-redux';  
import * as apiCalls from '../../apiCalls'; 
import * as transactionActions from '../../store/actions/transactions'; 
import { Navigation } from 'react-native-navigation';

class UserCategoriesScreen extends Component {
    constructor(props) {
        super(props); 

        const { navigator } = props; 
        // console.log(navigator); 
        navigator.setOnNavigatorEvent(this.onNavigatorEvent); 
    }

    onNavigatorEvent = event => {
        if(event.type === 'NavBarButtonPress' && event.id === 'goBack') {
            Navigation.dismissModal({
                animationType: 'slide-down'
            }); 
        }
    }

    handleOnCategoryDelete = async id => {
        const { token, getUserCategories } = this.props; 

        let tries = 0; 
        while(tries < 5) {
            try {
                await apiCalls.deleteUserCategory(token, id); 
                getUserCategories(token); 
                return; 
            }
            catch(err) {
                console.log(err); 
                tries++
            }
        }
        alert('Error deleting category.'); 
    }

    render() {
        const { categories } = this.props; 

        return (
            <Backdrop>
                <View style={styles.container}>
                    <Text style={styles.headingText}>Categories</Text>
                    <FlatList 
                        keyExtractor={item => item.id}
                        data={categories}
                        renderItem={info => (
                            <View style={styles.listItem}>
                                <Text style={styles.listItemText}>{info.item.category}</Text>
                                <View style={styles.buttonContainer}>
                                    <ButtonIcon 
                                        onPress={() => this.handleOnCategoryDelete(info.item.id)}
                                        icon="ios-trash" 
                                        size={26} 
                                        color={colors.DANGER_COLOR} />
                                </View>
                            </View>
                        )}
                    />
                </View>
            </Backdrop>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15, 
        marginBottom: 15
    }, 
    headingText: {
        fontSize: 14, 
        color: colors.DARK_COLOR, 
        marginBottom: 10, 
    }, 
    listItem: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        borderBottomWidth: 1, 
        borderBottomColor: colors.LIGHT_GREY_COLOR, 
        marginBottom: 5,
        paddingTop: 5, 
        paddingBottom: 5
    }, 
    listItemText: {
        fontSize: 16, 
        marginBottom: 2
    }, 
    buttonContainer: {

    }
}); 

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        categories: state.transactions.categories
    };
}; 

mapDispatchToProps = dispatch => {
    return {
        getUserCategories: token => dispatch(transactionActions.getUserCategories(token))
    };
}; 

export default connect(mapStateToProps, mapDispatchToProps)(UserCategoriesScreen); 