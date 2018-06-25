import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, StyleSheet } from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';
import * as colors from '../../assets/styles/colors'; 
import IncomeExpenseTable from '../IncomeExpenseTable/IncomeExpenseTable'; 

const barOverview = ({ data }) => {
    const formatedData = [
        {
            value: data.incomes,
            svg: { fill: colors.SUCCESS_COLOR }
        },
        {
            value: data.expenses,
            svg: { fill: colors.DANGER_COLOR }
        }
    ]; 

    return (
        <View style={styles.container}>
            <BarChart 
                style={styles.barChart}
                data={formatedData}
                gridMin={0}
                yAccessor={({ item }) => item.value}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid />
            </BarChart>
            <IncomeExpenseTable 
                data={data}
                incomeHeader="Incomes"
                expenseHeader="Expenses"
                netHeader="Net"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    barChart: {
        height: 200
    }
}); 

barOverview.propTypes = {
    data: PropTypes.object.isRequired
}

export default barOverview; 