import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 
import { View, StyleSheet, Modal, Text } from 'react-native'; 
import Calendar from 'react-native-calendar-datepicker'; 
import moment from 'moment'; 
import ButtonOutline from '../ButtonOutline/ButtonOutline'; 
import * as colors from '../../assets/styles/colors'; 

class DatePicker extends Component {
    static propTypes = {
        color: PropTypes.string, 
        textColor: PropTypes.string, 
        onChange: PropTypes.func.isRequired, 
        selectedDate: PropTypes.any.isRequired, 
        dayHeaderColor: PropTypes.string,
        size: PropTypes.number, 
    }

    state = {
        modalVisible: false
    }

    handleToggleModal = () => {
        this.setState(prevState => {
            return {
                modalVisible: !prevState.modalVisible
            }
        }); 
    }

    handleOnDateChange = date => {
        const { onChange } = this.props; 
        this.handleToggleModal(); 
        onChange(date); 
    }

    render() {
        const { modalVisible } = this.state; 
        const { selectedDate, color, textColor, dayHeaderColor, size, valid} = this.props; 

        return (
            <View>
                <ButtonOutline 
                    text={selectedDate.format('MM/DD/YYYY')}
                    color={color}
                    onPress={this.handleToggleModal}
                    iconRight="md-arrow-dropdown"
                    size={size} />
                <Modal
                    visible={modalVisible}
                    onRequestClose={this.handleToggleModal}
                    transparent={false}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View>
                            <Text style={[styles.headerText, {fontSize: size}]}>Select Date</Text>
                            <View>
                                <Calendar
                                    style={styles.calendarWrapper}
                                    barView={{backgroundColor: color, borderTopLeftRadius: 5, borderTopRightRadius: 5}}
                                    barText={[styles.calenderMonth, {color: textColor}]}
                                    dayHeaderView={{backgroundColor: dayHeaderColor}}
                                    stageView={{padding: 0}}
                                    daySelectedText={{color: color, borderWidth: 0, fontWeight: '800', fontSize: 18}}
                                    selected={selectedDate}
                                    onChange={this.handleOnDateChange}
                                    minDate={moment().subtract(2, 'months').startOf('day')}
                                    maxDate={moment().add(2, 'months').startOf('day')}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    modalContainer: {
        marginTop: 50, 
        alignItems: 'center', 
        justifyContent: 'space-between'
    }, 
    calendarWrapper: {
        borderRadius: 5, 
        borderColor: colors.LIGHT_GREY_COLOR, 
        borderWidth: 1
    }, 
    calenderMonth: {
        fontWeight: '800',
        fontSize: 16
    }, 
    selectedDate: { 
        fontWeight: '800'
    }, 
    headerText: {
        color: colors.DARK_COLOR, 
        marginBottom: 2
    }
})

export default DatePicker; 