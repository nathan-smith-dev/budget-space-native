import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as colors from '../../assets/styles/colors'; 

const startMainTabs = () => {
    // Check if android here 
    Promise.all([
        Icon.getImageSource('ios-list-box', 40), 
        Icon.getImageSource('ios-pie', 40),
        Icon.getImageSource('ios-calendar', 40),
        Icon.getImageSource('ios-people', 40)
    ])
    .then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    label: 'Transactions', 
                    screen: 'budget-space-native.TransactionsScreen', 
                    icon: sources[0], 
                    title: 'Incomes / Expenses'
                },
                {
                    label: 'Month', 
                    screen: 'budget-space-native.MonthlyOverviewScreen', 
                    icon: sources[1], 
                    title: 'Monthly Overview'
                },
                {
                    label: 'Annual', 
                    screen: 'budget-space-native.AnnualOverviewScreen', 
                    icon: sources[2], 
                    title: 'Annual Overview'
                },
                {
                    label: 'Roommates', 
                    screen: 'budget-space-native.RoommatesScreen', 
                    icon: sources[3], 
                    title: 'Roommates'
                },
            ], 
            tabsStyle: {
                tabBarSelectedButtonColor: colors.PRIMARY_COLOR
            }, 
            appStyle: {
                tabBarSelectedButtonColor: colors.PRIMARY_COLOR, 
                navBarBackgroundColor: colors.PRIMARY_COLOR, 
                navBarTextColor: colors.LIGHT_COLOR
            }, 
        }); 
    })
}; 

export default startMainTabs; 