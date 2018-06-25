import React from 'react'; 
import { View, StyleSheet } from 'react-native'; 
import * as colors from '../../../assets/styles/colors'; 

const tableRow = (props) => {
    return (
        <View style={[styles.container, {...props.style}]}>{props.children}</View>
    ); 
}; 

const styles = StyleSheet.create({
    container: {
        margin: 5, 
        flexDirection: 'row', 
        borderBottomWidth: 1, 
        borderBottomColor: colors.LIGHT_GREY_COLOR
    }
}); 

export default tableRow; 