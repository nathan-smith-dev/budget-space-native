import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import { connect } from 'react-redux';

class RoommatesScreen extends Component {
    constructor(props) {
        super(props); 

        const { navigator } = props; 
        console.log(navigator); 
        navigator.setOnNavigatorEvent(this.onNavigatorEvent); 
    }

    onNavigatorEvent = event => {
        const { navigator } = this.props; 
        if(event.type === 'NavBarButtonPress' && event.id === 'sideDrawerToggle') {
            navigator.toggleDrawer({
                side: 'left'
            }); 
        }
    }
    
    render() {
        return (
            <View style={styles.backDrop}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>Roommates Screen</Text>
                    </View>
                </View>
            </View>
            );
    }
}

const styles = StyleSheet.create({
    backDrop: {
        flex: 1, 
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#cae2ee'
    }, 
    container: {
        backgroundColor: '#ffff', 
        borderRadius: 5,
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'space-around'
    }, 
    title: {
        color: 'white', 
        fontSize: 26
    }
})

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
    }
}

export default connect(mapStateToProps)(RoommatesScreen); 

