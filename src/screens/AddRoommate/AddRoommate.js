import React, { Component } from 'react'; 
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native'; 
import Backdrop from '../../hoc/Backdrop/Backdrop'; 
import { connect } from 'react-redux';
import TextInput from '../../components/TextInput/TextInput'; 
import * as colors from '../../assets/styles/colors'; 
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon'; 
import Touchable from '../../hoc/Touchable/Touchable'; 
import * as apiCalls from '../../apiCalls'; 

class AddRoommateScreen extends Component {
    state = {
        email: '',
        filteredUsers: [], 
        touched: false
    }

    handleOnEmailChange = text => {
        const { users } = this.props; 

        if(text.length > 3) {
            this.setState({
                email: text, 
                filteredUsers: this.filterUsers(text)
            }); 
        }
        else {
            this.setState({
                email: text, 
                touched: true
            });
        }
    }

    filterUsers = text => {
        if(text.length < 3) return []; 

        const { users, mates, currentUser } = this.props; 
        const mateEmails = mates.map(mate => mate.email); 
        return users.filter(user => user.email.toLowerCase().includes(text.toLowerCase()) 
            && mateEmails.indexOf(user.email) === -1 
            && user.email !== currentUser.email);
    }

    hanldeOnSearch = () => {
        console.log(this.state.filteredUsers); 
    }

    hanldeOnEmailClicked = roommate => {
        Alert.alert('Send Roommate Request', 'To: ' + roommate.name, [
            {text: 'Send', onPress: () => this.handleSendRoomateRequest(roommate.uid)},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ])
    }

    handleSendRoomateRequest = async uid => {
        const { token, navigator } = this.props; 
        let tries = 0; 
            while (tries < 5) {
                try {
                    const request = await apiCalls.createRoommateRequests(token, uid); 
                    console.log(request.data); 
                    navigator.pop(); 
                    return; 
                }
                catch(err) {
                    console.log(err); 
                    tries++; 
                }
        }
    }

    render() {
        const { email, filteredUsers, touched } = this.state; 

        return (
            <Backdrop>
                <View style={styles.container}>
                    <View style={styles.emailContainer}>
                        <View style={{width: '80%'}}>
                            <TextInput  
                                placeholder="Roommate Email"
                                color={colors.PRIMARY_COLOR}
                                size={14}
                                value={email}
                                onChange={this.handleOnEmailChange}
                            />
                        </View>
                        <View style={{width: '20%', marginLeft: 15}}>
                            <ButtonIcon
                                icon="ios-search"
                                size={30}
                                color={colors.PRIMARY_COLOR}
                                onPress={this.hanldeOnSearch}
                            />
                        </View>
                    </View>
                    {filteredUsers && filteredUsers.length > 0 ? <FlatList 
                        keyExtractor={item => item.uid}
                        data={filteredUsers}
                        renderItem={info => (
                            <Touchable onPress={() => this.hanldeOnEmailClicked(info.item)}>
                                <View style={[styles.listItem, info.index !== filteredUsers.length-1 ? styles.listItemBorder : null]}>
                                    <Text style={styles.listItemText}>{`${info.item.email}`}</Text>
                                </View>
                            </Touchable>
                        )}
                    /> : 
                    (<View style={styles.listItem}>
                        <Text style={styles.listItemText}>{!touched ? "Enter email to search" : "No users found"}</Text>
                    </View>)}
                </View>
            </Backdrop>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15, 
        flex: 1
    }, 
    emailContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 20
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
    }
}); 

const mapStateToProps = state => {
    return {
        users: state.auth.users, 
        mates: state.roommates.mates, 
        currentUser: state.auth.currentUser, 
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(AddRoommateScreen); 