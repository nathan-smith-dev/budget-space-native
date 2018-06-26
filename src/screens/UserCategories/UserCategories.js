import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon'; 
import * as colors from '../../assets/styles/colors';
import { connect } from 'react-redux';  

class UserCategoriesScreen extends Component {


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
                                        onPress={() => console.log(info.item.id)}
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
        marginBottom: 5
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
        categories: state.transactions.categories
    };
}; 

export default connect(mapStateToProps)(UserCategoriesScreen); 