import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth'; 
import TransactionsScreen from './src/screens/Transactions/Transactions'; 
import MonthlyOverviewScreen from './src/screens/MonthlyOverview/MonthlyOverview'; 
import AnnualOverviewScreen from './src/screens/AnnualOverview/AnnualOverview'; 
import RoommatesScreen from './src/screens/Roommates/Roommates'; 
import SideDrawer from './src/screens/SideDrawer/SideDrawer'; 
import TransactionDetailScreen from './src/screens/TransactionDetail/TransactionDetail'; 
import FilterScreen from './src/screens/Filter/Filter'; 
import TransactionFormScreen from './src/screens/TransactionForm/TransactionForm';
import UserCategoriesScreen from './src/screens/UserCategories/UserCategories';
import RoommateDetailScreen from './src/screens/RoommateDetail/RoommateDetail';
import AddRoommateScreen from './src/screens/AddRoommate/AddRoommate';
import UserRoommatesScreen from './src/screens/UserRoommates/UserRoommates';
import RoommateRequestsScreen from './src/screens/RoommateRequests/RoommateRequests';

import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore'; 
export const store = configureStore(); 
import startSinglePage from './src/screens/MainTabs/startSinglePage'; 

// Register Screens
Navigation.registerComponent('budget-space-native.AuthScreen', () => AuthScreen, store, Provider);
Navigation.registerComponent('budget-space-native.TransactionsScreen', () => TransactionsScreen, store, Provider);
Navigation.registerComponent('budget-space-native.MonthlyOverviewScreen', () => MonthlyOverviewScreen, store, Provider);
Navigation.registerComponent('budget-space-native.AnnualOverviewScreen', () => AnnualOverviewScreen, store, Provider);
Navigation.registerComponent('budget-space-native.RoommatesScreen', () => RoommatesScreen, store, Provider);
Navigation.registerComponent('budget-space-native.SideDrawer', () => SideDrawer, store, Provider);
Navigation.registerComponent('budget-space-native.TransactionDetail', () => TransactionDetailScreen);
Navigation.registerComponent('budget-space-native.FilterScreen', () => FilterScreen, store, Provider);
Navigation.registerComponent('budget-space-native.TransactionFormScreen', () => TransactionFormScreen, store, Provider);
Navigation.registerComponent('budget-space-native.UserCategoriesScreen', () => UserCategoriesScreen, store, Provider);
Navigation.registerComponent('budget-space-native.RoommateDetailScreen', () => RoommateDetailScreen, store, Provider);
Navigation.registerComponent('budget-space-native.AddRoommateScreen', () => AddRoommateScreen, store, Provider);
Navigation.registerComponent('budget-space-native.UserRoommatesScreen', () => UserRoommatesScreen, store, Provider);
Navigation.registerComponent('budget-space-native.RoommateRequestsScreen', () => RoommateRequestsScreen, store, Provider);

// Start App
startSinglePage(); 