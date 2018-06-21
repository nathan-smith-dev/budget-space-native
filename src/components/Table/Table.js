import React from 'react'; 
import { View, StyleSheet } from 'react-native'; 

const table = (props) => {
    return (
        <View style={styles.container}>{props.children}</View>
    ); 
}; 

const styles = StyleSheet.create({
    container: {
        
    }
}); 

export default table; 