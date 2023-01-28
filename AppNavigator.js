import { createStackNavigator } from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import Login from './screens/Login';
import Register from './screens/Register';

const AppNavigator = createStackNavigator({
    WelcomeScreen: { screen: WelcomeScreen },
    Login: {screen: Login},
    Register: {screen: Register}
});

export default AppNavigator;