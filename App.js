import { Navigation } from 'react-native-navigation';

import HomeScreen from './src/screens/Home/Home'; 

import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore'; 
export const store = configureStore(); 

// Register Screens
Navigation.registerComponent('budget-space-native.HomeScreen', () => HomeScreen, store, Provider);

// Start App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'budget-space-native.HomeScreen', 
    title: 'Welcome'
  }
}); 