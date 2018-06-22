import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View } from 'react-native';
import Touchable from '../../hoc/Touchable/Touchable'; 
import Icon from 'react-native-vector-icons/Ionicons';

const buttonIcon = ({ icon, color, size, onPress }) => {
    return (
        <Touchable onPress={onPress}>
            <View>
                <Icon name={icon} color={color} size={size} />
            </View>
        </Touchable>
    ); 
};

buttonIcon.propTypes = {
    icon: PropTypes.string.isRequired, 
    color: PropTypes.string.isRequired, 
    size: PropTypes.number.isRequired, 
    onPress: PropTypes.func.isRequired
}; 

export default buttonIcon; 