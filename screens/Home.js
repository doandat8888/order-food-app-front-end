import { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Image, Dimensions, Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, images } from "../constants";
import CategoryList from "../components/CategoryList";
import CategoryHomeList from "../components/CategoryHomeList";
import foodList from "../constants";
import BestSellerItem from "../components/BestSellerItem";
import BestSellerList from "../components/BestSellerList";
import HotComboList from "../components/HotComboList";
import Header from "../components/header";
import Slider from "../components/slider";
import Footer from "../components/Footer";
import foodService from "../services/foodService";
import axios from "axios";

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const Home = (props) => {
    const imageSlider = [
        images.slider1,
        images.slider2,
        images.slider3,
        images.slider6,
    ]

    const [foods, setFoods] = useState([]);

    useEffect(() => {
        getAllFood();
        
    }, [])

    const getAllFood = async() => {
        try {
            let response = await axios.get('http://192.168.1.187:3000/api/v1/get-all-food');
            if(response) {
                setFoods(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [imgActive, setImgActive] = useState('');

    const onPressCategoryItemHome = (categoryName, type) => {
        if(type === 'navigate') {
            alert('Navigate');
        }
    }

    const viewDetailProduct = (idProduct) => {
        props.navigation.navigate('DetailProduct', {id: idProduct});
    }

    const gotoCart = () => {
        props.navigation.navigate('Cart');
    }

    

    return (
        <View style={{flex: 1}}>
            <Header iconRight={images.cartIcon} onPressIconRight={gotoCart}/>
            <ScrollView>
                <Slider />
                <View
                    style={{
                        height: 80,
                        
                        marginBottom: 20
                    }}
                >
                    <CategoryHomeList></CategoryHomeList>
                </View>
                <View
                    style={{
                        borderTopWidth: 1,
                        borderTopColor: colors.gray,
                        borderBottomColor: colors.gray,
                        borderBottomWidth: 1,
                        marginBottom: 20,
                    }}
                >
                    <Text style={{marginHorizontal: 20, color: colors.mainColor, marginBottom: 20, fontSize: 20}}>Best seller</Text>
                    <BestSellerList onPressProductItem={viewDetailProduct} foods={foods && foods.length > 0 ? foods : ''}></BestSellerList>
                </View>
                <View
                    style={{
                        height: 80,
                        borderBottomColor: colors.gray,
                        borderBottomWidth: 1,
                        marginBottom: 20,
                    }}
                >
                    <CategoryList onPress={onPressCategoryItemHome} type='navigate'></CategoryList>
                </View>
                <View
                    style={{
                        height: 260,
                        borderBottomColor: colors.gray,
                        borderBottomWidth: 1,
                        marginBottom: 20
                    }}
                >
                    <Text style={{marginHorizontal: 20, color: colors.mainColor, marginBottom: 20, fontSize: 20}}>Hot combo</Text>
                    <HotComboList></HotComboList>
                </View>
            </ScrollView>
        </View>
        
    )
}

export default Home;