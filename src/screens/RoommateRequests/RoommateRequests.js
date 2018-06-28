import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import { connect } from 'react-redux'; 
import * as colors from '../../assets/styles/colors'; 
import * as apiCalls from '../../apiCalls'; 
import * as roommateActions from '../../store/actions/roommates'; 
import Touchable from '../../hoc/Touchable/Touchable'; 


class RoommateRequestsScreen extends Component {

    handleRoommateRequestPressed = id => {
        Alert.alert('Accept Roommate Request', null, [
            {text: 'Accept', onPress: () => this.handleAcceptRequest(id)},
            {text: 'Ignore', onPress: () => this.handleDenyRequst(id)},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ]); 
    }

    handleAcceptRequest = async id => {
        const { navigator, token, getRoommateRequests, getRoommates } = this.props; 

        let tries = 0; 
        while (tries < 5) {
            try {
                const result = await apiCalls.acceptRoommateRequest(token, id, true); 
                getRoommateRequests(token); 
                getRoommates(token); 
                navigator.pop(); 
                return; 
            }
            catch(err) {
                console.log(err); 
                tries++; 
            }
        }
        alert('Error accepting request.'); 
    }
    
    handleDenyRequst = async id => {
        const { navigator, token, getRoommateRequests } = this.props; 

        let tries = 0; 
        while (tries < 5) {
            try {
                const result = await apiCalls.acceptRoommateRequest(token, id, false); 
                getRoommateRequests(token); 
                navigator.pop(); 
                return; 
            }
            catch(err) {
                console.log(err); 
                tries++; 
            }
        }
        alert('Error denying request.'); 
    }

    render() {
        const { requests } = this.props; 

        return (
            <Backdrop>
                <View style={styles.container}>
                    <FlatList 
                        keyExtractor={item => item.id}
                        data={requests}
                        renderItem={info => (
                            <Touchable onPress={() => this.handleRoommateRequestPressed(info.item.id)}>
                                <View style={[styles.listItem, info.index !== requests.length-1 ? styles.listItemBorder : null]}>
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
        flex: 1, 
        padding: 15
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
    listItemText: {
        fontSize: 16, 
        marginBottom: 2
    },
    listItemBorder: {
        borderBottomWidth: 1, 
        borderBottomColor: colors.LIGHT_GREY_COLOR, 
    }, 
}); 

const mapStateToProps = state => {
    return {
        requests: state.roommates.requests, 
        token: state.auth.token
    }; 
}; 

mapDispatchToProps = dispatch => {
    return {
        getRoommateRequests: token => dispatch(roommateActions.getRoommateRequests(token)),
        getRoommates: token => dispatch(roommateActions.getRoommates(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoommateRequestsScreen); 

