import React from 'react'; 
import { TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'; 

const touchable = (props) => {
    return (
        Platform.OS === 'ios' ? 
            <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
            : <TouchableNativeFeedback {...props}>{props.children}</TouchableNativeFeedback>
    ); 
}

export default touchable; 
