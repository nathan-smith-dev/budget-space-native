import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth'; 
import TransactionsScreen from './src/screens/Transactions/Transactions'; 
import MonthlyOverviewScreen from './src/screens/MonthlyOverview/MonthlyOverview'; 
import AnnualOverviewScreen from './src/screens/AnnualOverview/AnnualOverview'; 
import RoommatesScreen from './src/screens/Roommates/Roommates'; 

import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore'; 
export const store = configureStore(); 

// Register Screens
Navigation.registerComponent('budget-space-native.AuthScreen', () => AuthScreen, store, Provider);
Navigation.registerComponent('budget-space-native.TransactionsScreen', () => TransactionsScreen, store, Provider);
Navigation.registerComponent('budget-space-native.MonthlyOverviewScreen', () => MonthlyOverviewScreen, store, Provider);
Navigation.registerComponent('budget-space-native.AnnualOverviewScreen', () => AnnualOverviewScreen, store, Provider);
Navigation.registerComponent('budget-space-native.RoommatesScreen', () => RoommatesScreen, store, Provider);

// Start App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'budget-space-native.AuthScreen', 
    title: 'Login'
  }
}); 