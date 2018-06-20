import { Navigation } from 'react-native-navigation'; 

const startSinglePage = () => {
    Navigation.startSingleScreenApp({
        screen: {
          screen: 'budget-space-native.AuthScreen', 
          title: 'Login'
        }
    }); 
}

export default startSinglePage; 