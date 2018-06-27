import React, { Component } from 'react'; 
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'; 
import { connect } from 'react-redux';
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import Touchable from '../../hoc/Touchable/Touchable'; 
import * as colors from '../../assets/styles/colors';
import Icon from 'react-native-vector-icons/Ionicons'; 

class RoommatesScreen extends Component {
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
        else if(event.type === 'NavBarButtonPress' && event.id === 'addRoommateToggle') {
            navigator.push({
                screen: 'budget-space-native.AddRoommateScreen', 
                title: 'Add Roommate', 
                passProps: {}, 
                animated: true, 
                animationType: 'fade'
            }); 
        }
    }

    handleRoommateClicked = uid => {
        const { navigator } = this.props; 
        Icon.getImageSource('md-add', 40)
            .then(source => {
                navigator.push({
                    screen: 'budget-space-native.RoommateDetailScreen', 
                    title: 'Roommate Expenses', 
                    passProps: { roommateId: uid }, 
                    animated: true, 
                    animationType: 'fade', 
                    navigatorButtons: {
                        rightButtons: [
                            {
                                icon: source, 
                                title: 'add roommate expense', 
                                id: 'addRoommateExpenseToggle', 
                                buttonFontWeight: '800'
                            }
                        ]
                    }
                }); 
            })
    }
    
    render() {
        const { roommates, notifications } = this.props;

        let roommatesEls = (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" colors={colors.PRIMARY_COLOR} />
            </View>
        ); 
        
        if(roommates) {
            <ScrollView> {/*use ScrollView because of conditional notification render*/}
                {roommatesEls = roommates.map((mate, index) => (
                    <Touchable key={mate.id} onPress={() => this.handleRoommateClicked(mate.id)}>
                        <View style={[styles.listItem, index !== roommates.length-1 ? styles.listItemBorder : null]}>
                            <Text style={styles.listItemText}>{`${mate.firstName} ${mate.lastName}`}</Text>
                            {notifications[mate.id] && <View style={styles.notificationContainer}><Text style={styles.notificationText}>{notifications[mate.id]}</Text></View>}
                        </View>
                    </Touchable>
                ))} 
            </ScrollView>
        }

        return (
            <Backdrop>
                <View style={styles.container}>
                    <Text style={styles.headingText}>Roommates</Text>
                    {roommatesEls}
                </View>
            </Backdrop>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15, 
        flex: 1,
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
        alignItems: 'center',
        marginBottom: 5,
        paddingTop: 5, 
        paddingBottom: 5
    }, 
    listItemBorder: {
        borderBottomWidth: 1, 
        borderBottomColor: colors.LIGHT_GREY_COLOR, 
    }, 
    listItemText: {
        fontSize: 16, 
        marginBottom: 2
    }, 
    notificationContainer: {
        width: 20, 
        height: 20, 
        borderRadius: 10, 
        backgroundColor: colors.PRIMARY_COLOR, 
        alignItems: 'center', 
        justifyContent: 'center'
    }, 
    notificationText: {
        color: colors.LIGHT_COLOR, 
        fontSize: 10
    }
}); 

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        roommates: state.roommates.mates, 
        notifications: state.roommates.notifications
    }
}

export default connect(mapStateToProps)(RoommatesScreen); 

