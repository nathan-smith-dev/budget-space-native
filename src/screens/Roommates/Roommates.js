import React, { Component } from 'react'; 
import { View, Text, StyleSheet, FlatList } from 'react-native'; 
import { connect } from 'react-redux';
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import Touchable from '../../hoc/Touchable/Touchable'; 
import * as colors from '../../assets/styles/colors';

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
            
        }
    }

    handleRoommateClicked = uid => {
        const { navigator } = this.props; 
        navigator.push({
            screen: 'budget-space-native.RoommateDetailScreen', 
            title: 'Roommate Expenses', 
            passProps: { roommateId: uid }, 
            animated: true, 
            animationType: 'fade'
        }); 
    }
    
    render() {
        const { roommates } = this.props;

        return (
            <Backdrop>
                <View style={styles.container}>
                    <Text style={styles.headingText}>Roommates</Text>
                    <FlatList 
                        keyExtractor={item => item.id}
                        data={roommates}
                        renderItem={info => (
                            <Touchable onPress={() => this.handleRoommateClicked(info.item.id)}>
                                <View style={[styles.listItem, info.index !== roommates.length-1 ? styles.listItemBorder : null]}>
                                    <Text style={styles.listItemText}>{`${info.item.firstName} ${info.item.lastName}`}</Text>
                                </View>
                            </Touchable>
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
    buttonContainer: {

    }
}); 

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        roommates: state.roommates.mates
    }
}

export default connect(mapStateToProps)(RoommatesScreen); 

