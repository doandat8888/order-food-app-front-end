import Header from "../components/header";
import Footer from "../components/Footer";
import Foods from "./Foods";
import Home from "./Home";
import Settings from "./Settings";
import { View, Image} from "react-native";
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FooterItem from "../components/FooterItem";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Colors } from "react-native/Libraries/NewAppScreen";
import {images} from "../constants";
import {colors} from "../constants";
import Cart from "./Cart";
import UserInfo from "./UserInfo";
import { useRoute } from "@react-navigation/native";
import accountList from "../constants/accountList";
import foodService from "../services/foodService";
import { useEffect, useState } from "react";
import axios from "axios";


const Tab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
    headerShown: false, 
    tabBarActiveTintColor: colors.mainColor, 
    tabBarInactiveTintColor: 'black',
    tabBarIcon: ({focused, size, name}) => {
        let screeenName = route.name;
        let iconImg = '';
        if(screeenName === 'Home') {
            iconImg = images.homeIcon;
        }
        if(screeenName === 'Foods') {
            iconImg = images.foodsIcon;
        }
        if(screeenName === 'User') {
            iconImg = images.userIcon;
        }
        return <Image source={iconImg} style={{width: 20, height: 20, marginLeft: 'auto', marginRight: 'auto', tintColor: focused ? colors.mainColor : 'black'}}/>
    }
});

const Main = () => {
    const route = useRoute();
    const idUser = route && route.params && route.params.userId ? route.params.userId : '';
    const [users, setUsers] = useState(accountList);
    const [user, setUser] = useState({});
    //const userInfo = users.find(user => user.id === idUser);

    useEffect(() => {
        getUserInfo();
    }, [])

    const getUserInfo = async() => {
        let response = await axios.get(`http://192.168.1.187:3000/api/v1/get-user-by-id?id=${idUser}`);
        if(response && response.data && response.data.errCode === 0) {
            setUser(response.data.data);
        }
    }
    return (
        <Tab.Navigator 
            screenOptions={screenOptions}
        >
            <Tab.Screen name={"Home"} component={Home}/>
            <Tab.Screen name={"Foods"} component={Foods}/>
            <Tab.Screen name={"User"} children={() => <UserInfo user={user && user.name ? user : ''}/>}/>
        </Tab.Navigator>
        
    )
}

export default Main;