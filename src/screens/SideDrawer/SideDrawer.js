import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import { connect } from 'react-redux';
import Media from '../../components/Media/Media'; 
import Touchable from '../../hoc/Touchable/Touchable'; 
import Icon from 'react-native-vector-icons/Ionicons'; 
import * as colors from '../../assets/styles/colors'; 
import * as firebase from '../../firebase/firebase'; 
import startSinglePage from '../MainTabs/startSinglePage'; 
import { Navigation } from 'react-native-navigation'; 

class SideDrawer extends Component {

    handleLogOut = () => {
        firebase.googleLogout(); 
        startSinglePage(); 
    }

    handleOnFilter = () => {
        Navigation.showModal({
            screen: 'budget-space-native.FilterScreen', 
            title: 'Filter Settings', 
            passProps: {}, 
            animated: true, 
            animationType: 'fade'
        }); 
        const { navigator } = this.props; 
        navigator.toggleDrawer({
            side: 'left'
        }); 
    }

    handleOnUserCategoriesScreen = () => {
        Icon.getImageSource("ios-arrow-back", 30)
            .then(source => {
                Navigation.showModal({
                    screen: 'budget-space-native.UserCategoriesScreen', 
                    title: 'Edit Categories', 
                    passProps: {}, 
                    animated: true, 
                    animationType: 'fade', 
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: source, 
                                title: 'back', 
                                id: 'goBack'
                            }
                        ]
                    }
                }); 
                const { navigator } = this.props; 
                navigator.toggleDrawer({
                    side: 'left'
                }); 
            }); 
    }
    
    handleOnUserRoommatesScreen = () => {
        Icon.getImageSource('ios-arrow-back', 30)
            .then(source=> {
                Navigation.showModal({
                    screen: 'budget-space-native.UserRoommatesScreen', 
                    title: 'Edit Roommates', 
                    passProps: {}, 
                    animated: true, 
                    animationType: 'fade', 
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: source, 
                                title: 'back', 
                                id: 'goBack'
                            }
                        ]
                    }
                }); 
                const { navigator } = this.props; 
                navigator.toggleDrawer({
                    side: 'left'
                }); 
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Touchable onPress={this.handleLogOut}>
                    <View style={styles.listItem}>
                        <Text style={styles.listText}>Logout</Text>
                        <Icon name="ios-log-out" size={30} color={colors.PRIMARY_COLOR} />
                    </View>
                </Touchable>
                <Touchable onPress={this.handleOnFilter}>
                    <View style={styles.listItem}>
                        <Text style={styles.listText}>Filter Settings</Text>
                        <Icon name="ios-funnel-outline" size={30} color={colors.PRIMARY_COLOR} />
                    </View>
                </Touchable>
                <Touchable onPress={this.handleOnUserCategoriesScreen}>
                    <View style={styles.listItem}>
                        <Text style={styles.listText}>Edit Categories</Text>
                        <Icon name="ios-settings-outline" size={30} color={colors.PRIMARY_COLOR} />
                    </View>
                </Touchable>
                <Touchable onPress={this.handleOnUserRoommatesScreen}>
                    <View style={styles.listItem}>
                        <Text style={styles.listText}>Edit Roomates</Text>
                        <Icon name="ios-people-outline" size={30} color={colors.PRIMARY_COLOR} />
                    </View>
                </Touchable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee', 
        borderRadius: 5,
        flex: 1, 
        padding: 15, 
        paddingTop: 40,
        minWidth: '80%'
    }, 
    title: {
        color: 'black', 
        fontSize: 26
    }, 
    listText: {
        color: colors.PRIMARY_COLOR, 
        fontSize: 16, 
        paddingRight: 20
    }, 
    listItem: {
        borderBottomWidth: 1, 
        borderBottomColor: colors.LIGHT_GREY_COLOR, 
        padding: 3, 
        marginBottom: 5, 
        justifyContent: 'space-between', 
        flexDirection: 'row'
    }
})

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
    }
}

export default connect(mapStateToProps)(SideDrawer); 

