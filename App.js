import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {Login} from './screens';
import {Register} from './screens';
import {WelcomeScreen} from './screens';
import {Foods} from './screens';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Home} from './screens';
import {Main} from './screens';
import Footer from './components/Footer';
import {DetailProduct} from './screens';
import { Provider } from 'react-redux';
import {Cart} from './screens';
import AdminPage from './screens/Admin';
import {EditProduct} from './screens';
import {EditCategory} from './screens';
import store from './store';
import {UserInfo} from './screens';
import { Checkout } from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName='WelcomeScreen' screenOptions={{headerShown: false}}>
                <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Register' component={Register} />
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Foods' component={Foods} />
                <Stack.Screen name='Main' component={Main} />
                <Stack.Screen name='DetailProduct' component={DetailProduct} />
                <Stack.Screen name='Admin' component={AdminPage} />
                <Stack.Screen name='Cart' component={Cart} />
                <Stack.Screen name='EditProduct' component={EditProduct} />
                <Stack.Screen name='UserInfo' component={UserInfo} />
                <Stack.Screen name='EditCategory' component={EditCategory} />
                <Stack.Screen name='Checkout' component={Checkout} />
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

