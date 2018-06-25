import React from 'react'; 
import PropTypes from 'prop-types'; 
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native'; 
import * as colors from '../../assets/styles/colors'; 
import { Table } from '../Table'; 
import PercentTableHeader from './PercentTableHeader/PercentTableHeader'; 
import PercentTableRow from './PercentTableRow/PercentTableRow'; 

const percentTable = ({ categoryData, total, refreshing, onRefresh }) => {
    return (
        <View style={styles.container}>
            <Table>
                <PercentTableHeader />
                <FlatList 
                    keyExtractor={item => item.category}
                    data={categoryData}
                    renderItem={info => (
                        <PercentTableRow 
                            amount={info.item.total}
                            categoryName={info.item.category}
                            percentage={(info.item.total / total)*100} 
                            labelColor={colors.PIE_CHART_COLORS[info.index]}
                        />
                    )}
                    refreshControl={
                        <RefreshControl 
                            colors={[colors.PRIMARY_COLOR]} 
                            tintColor={colors.PRIMARY_COLOR} 
                            refreshing={refreshing}
                            onRefresh={onRefresh} />
                    }
                />
                
            </Table>
        </View>
    ); 
}; 

const styles = StyleSheet.create({
    container: {
        margin: 15, 
        flex: 1
    }
}); 

percentTable.propTypes = {
    categoryData: PropTypes.arrayOf(Object).isRequired, 
    total: PropTypes.number.isRequired, 
    refreshing: PropTypes.bool, 
    onRefresh: PropTypes.func
}; 

export default percentTable; 