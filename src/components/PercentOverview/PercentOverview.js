import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts'; 
import PercentTable from '../PercentTable/PercentTable'; 
import * as colors from '../../assets/styles/colors'; 


const percentOverview = ({ data, refreshing, onRefresh }) => {
    let total = 0;
    const pieData = data.map((expense, index) => {
        total+=expense.total; 
        return {
            key: index,
            value: expense.total, 
            svg: { fill: colors.PIE_CHART_COLORS[index] }
        }
    });

    return (
        <View style={{flex: 1}}>
            <View style={styles.chart}>
                <PieChart
                    style={styles.chart}
                    outerRadius={'100%'}
                    innerRadius={10}
                    data={pieData}
                />
            </View>
            <View style={{flex: 1}}>
                <PercentTable 
                    categoryData={data} 
                    total={total} 
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chart: {
        height: 200
    }
}); 

percentOverview.propTypes = {
    data: PropTypes.arrayOf(Object).isRequired,
    refreshing: PropTypes.bool, 
    onRefresh: PropTypes.func
}

export default percentOverview; 