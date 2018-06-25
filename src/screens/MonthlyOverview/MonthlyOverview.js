import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import { connect } from 'react-redux';
import { PieChart } from 'react-native-svg-charts'; 

class MonthlyOverviewScreen extends Component {
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
    }
    
    render() {

        const data = [
            {
                key: 1,
                value: 50,
                svg: { fill: '#600080' },
                arc: { outerRadius: '130%', cornerRadius: 10,  }
            },
            {
                key: 2,
                value: 50,
                svg: { fill: '#9900cc' }
            },
            {
                key: 3,
                value: 40,
                svg: { fill: '#c61aff' }
            },
            {
                key: 4,
                value: 95,
                svg: { fill: '#d966ff' }
            },
            {
                key: 5,
                value: 35,
                svg: { fill: '#ecb3ff' }
            }
        ]

        return (
            <View style={styles.backDrop}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>Monthly Overview Screen</Text>
                        <PieChart
                            style={{ height: 200 }}
                            outerRadius={'70%'}
                            innerRadius={10}
                            data={data}
                        />
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

