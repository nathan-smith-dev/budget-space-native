import { Navigation } from 'react-native-navigation'; 
import * as colors from '../../assets/styles/colors'; 

const startSinglePage = () => {
    Navigation.startSingleScreenApp({
        screen: {
          screen: 'budget-space-native.AuthScreen', 
          title: 'Login'
        }, 
        appStyle: {
            tabBarSelectedButtonColor: colors.PRIMARY_COLOR, 
            navBarBackgroundColor: colors.PRIMARY_COLOR, 
            navBarTextColor: colors.LIGHT_COLOR, 
            navBarButtonColor: colors.LIGHT_COLOR
        }, 
    }); 
}

export default startSinglePage; 