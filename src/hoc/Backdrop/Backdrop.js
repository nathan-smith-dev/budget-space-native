import React from 'react'; 
import * as colors from '../../assets/styles/colors'; 
import { View, StyleSheet } from 'react-native'; 

const backdrop = (props) => {
    return (
        <View style={styles.backDrop}>
            <View style={styles.container}>
                {props.children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backDrop: {
        flex: 1, 
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: colors.SECONDARY_COLOR
    }, 
    container: {
        backgroundColor: colors.LIGHT_COLOR, 
        borderRadius: 5,
        flex: 1, 
    }
}); 

export default backdrop; 

