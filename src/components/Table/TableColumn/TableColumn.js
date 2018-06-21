import React from 'react'; 
import { View, StyleSheet } from 'react-native'; 

const tableCol = (props) => {
    return (
        <View style={[styles.container, {flex: props.grow},  props.style]}>
            {props.children}
        </View>
    ); 
}; 

const styles = StyleSheet.create({
    container: {
        padding: 5
    }
}); 

export default tableCol; 