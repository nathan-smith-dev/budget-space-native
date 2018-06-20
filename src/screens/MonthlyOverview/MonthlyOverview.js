import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import { connect } from 'react-redux';

class MonthlyOverviewScreen extends Component {

    render() {
        return (
            <View style={styles.backDrop}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>Monthly Overview Screen</Text>
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

export default connect(mapStateToProps)(MonthlyOverviewScreen); 

