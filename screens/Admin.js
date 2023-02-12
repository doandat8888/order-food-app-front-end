import { Text, View, Image, TouchableOpacity, TextInput, Modal, Pressable, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import HeaderSub from "../components/headerSub";
import { images, colors } from "../constants";
import axios from "axios";
import { FlatList} from "react-native-gesture-handler";
import FoodAdminItem from "../components/FoodAdminItem";
import { SelectList } from "react-native-dropdown-select-list";
import ButtonMain from "../components/ButtonMain";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ManageProduct from "./ManageProduct";
import ManageProductCategory from "./ManageCategory";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
    headerShown: false, 
    tabBarActiveTintColor: colors.mainColor, 
    tabBarInactiveTintColor: 'black',
    tabBarIcon: ({focused, size, name}) => {
        let screeenName = route.name;
        let iconImg = '';
        if(screeenName === 'Foods') {
            iconImg = images.foodsIcon;
        }
        if(screeenName === 'Categories') {
            iconImg = images.listIcon;
        }
        return <Image source={iconImg} style={{width: 20, height: 20, marginLeft: 'auto', marginRight: 'auto', tintColor: focused ? colors.mainColor : 'black'}}/>
    }
});

const AdminPage = (props) => {
    const route = useRoute();
    const idUser = route && route.params && route.params.userId ? route.params.userId : '';
    const msg = route && route.params && route.params.msg ? route.params.msg : '';
    const [msgEdit, setMsgEdit] = useState('');

    const onEditProduct = (idProduct) => {
        props.navigation.navigate('EditProduct', {
            id: idProduct
        })
    }

    const onEditCategory = (idCategory) => {
        props.navigation.navigate('EditCategory', {
            id: idCategory
        })
    }

    if(msg !== '') {
        alert("Message: " + msg);
    }

    useEffect(() => {
        
    }, [])

    return (
        <Tab.Navigator 
            screenOptions={screenOptions}
        >
        <Tab.Screen name={"Foods"} children={() => <ManageProduct idUser={idUser} onEditProduct={onEditProduct} msg={msg}/>}/>
        <Tab.Screen name={"Categories"} children={() => <ManageProductCategory idUser={idUser} onEditCategory={onEditCategory}/>}/>
    </Tab.Navigator>
    )
}


export default AdminPage;