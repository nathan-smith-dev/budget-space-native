import React from 'react'; 
import { View, StyleSheet } from 'react-native'; 
import Calendar from 'react-native-calendar-datepicker'; 
import moment from 'moment'; 

const datePicker = ({ selectedDate, onChange }) => {
    return (
        <View>
            <Calendar 
                selected={selectedDate}
                onChange={onChange}
                minDate={moment().subtract(2, 'months').startOf('day')}
                maxDate={moment().add(2, 'months').startOf('day')}
            />
        </View>
    );
};

export default datePicker; 