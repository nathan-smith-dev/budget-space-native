import { Navigation } from 'react-native-navigation';

import HomeScreen from './src/screens/Home/Home'; 

// Register Screens
Navigation.registerComponent('budget-space-native.HomeScreen', () => HomeScreen);

// Start App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'budget-space-native.HomeScreen', 
    title: 'Welcome'
  }
}); 