import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import * as colors from '../../assets/styles/colors'; 

const startMainTabs = () => {
    // Check if android here 
    Promise.all([
        Icon.getImageSource('ios-list-box', 40), 
        Icon.getImageSource('ios-pie', 40),
        Icon.getImageSource('ios-calendar', 40),
        Icon.getImageSource('ios-people', 40),
        Icon.getImageSource('md-menu', 40),
        Icon.getImageSource('md-add', 40),
        Icon.getImageSource('ios-stats', 40),
    ])
    .then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    label: 'Transactions', 
                    screen: 'budget-space-native.TransactionsScreen', 
                    icon: sources[0], 
                    title: 'Incomes / Expenses', 
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[4], 
                                title: 'menu', 
                                id:'sideDrawerToggle'
                            }
                        ], 
                        rightButtons: [
                            {
                                icon: sources[5], 
                                title: 'add expense', 
                                id: 'addExpenseToggle', 
                                buttonFontWeight: '800'
                            }
                        ]
                    }
                },
                {
                    label: 'Month', 
                    screen: 'budget-space-native.MonthlyOverviewScreen', 
                    icon: sources[1], 
                    title: 'Monthly Overview', 
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[4], 
                                title: 'menu', 
                                id:'sideDrawerToggle'
                            }
                        ], 
                        rightButtons: [
                            {
                                icon: sources[6], 
                                title: 'bar', 
                                id: 'toggleBarChart'
                            },
                            {
                                icon: sources[1], 
                                title: 'pie', 
                                id: 'togglePieChart'
                            }
                        ]
                    }
                },
                {
                    label: 'Annual', 
                    screen: 'budget-space-native.AnnualOverviewScreen', 
                    icon: sources[2], 
                    title: 'Annual Overview', 
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[4], 
                                title: 'menu', 
                                id:'sideDrawerToggle'
                            }
                        ], 
                        rightButtons: [
                            {
                                icon: sources[6], 
                                title: 'bar', 
                                id: 'toggleBarChart'
                            },
                            {
                                icon: sources[1], 
                                title: 'pie', 
                                id: 'togglePieChart'
                            }
                        ]
                    }
                },
                {
                    label: 'Roommates', 
                    screen: 'budget-space-native.RoommatesScreen', 
                    icon: sources[3], 
                    title: 'Roommates', 
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[4], 
                                title: 'menu', 
                                id:'sideDrawerToggle'
                            }
                        ], 
                        rightButtons: [
                            {
                                icon: sources[5], 
                                title: 'add roommate', 
                                id: 'addRoommateToggle', 
                                buttonFontWeight: '800'
                            }
                        ]
                    }
                },
            ], 
            drawer: {
                left: {
                    screen: 'budget-space-native.SideDrawer'
                }
            }, 
            tabsStyle: {
                tabBarSelectedButtonColor: colors.PRIMARY_COLOR,
                tabBarBackgroundColor: colors.LIGHT_COLOR
            }, 
            appStyle: {
                tabBarSelectedButtonColor: colors.PRIMARY_COLOR, 
                navBarBackgroundColor: colors.PRIMARY_COLOR, 
                navBarTextColor: colors.LIGHT_COLOR, 
                navBarButtonColor: colors.LIGHT_COLOR
            }, 
        }); 
    })
}; 

export default startMainTabs; 