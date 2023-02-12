import { colors, images } from "../constants";
import { connect, useDispatch, useSelector } from "react-redux";
import { addItems } from "../reducers/cartItems";
import axios from "axios";
import Foods from "./Foods";
import { addLikeItems, removeLikeItem } from "../reducers/likeItems";
import { useRoute } from "@react-navigation/native";
import { View, TextInput, TouchableOpacity, Image, Dimensions, Text } from "react-native";
import { HeaderSub } from "../components";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import FoodByTypeList from "../components/FoodByTypeList";
import { useEffect } from "react";
const ProductByType = (props) => {

    const route = useRoute();
    let categoryName = route.params.categoryName;
    const [foods, setFoods] = useState([]);
    const dispatch = useDispatch();

    const getFoodByType = async() => {
        try {
            let response = await axios.get(`http://192.168.1.187:3000/api/v1/get-food-by-type?type=${categoryName}`);
            if(response && response.data.errCode === 0) {
                setFoods(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

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

    const onViewDetailProduct = (idProduct) => {
        props.navigation.navigate('DetailProduct', {
            id: idProduct
        })
    }

    const onAddToCart = (foodInfo, quantity) => {
        props.navigation.navigate('Cart');
        dispatch(addItems({
            foodInfo: foodInfo,
            quantity: quantity
        }))
    }

    useEffect(() => {
        if(categoryName === '') {
            getAllFood();
        }else {
            getFoodByType();
        }
        
    }, [])

    return (
        <View style={{paddingBottom: 100}}>
            <HeaderSub iconLeft={images.arrowLeft} title={categoryName === '' ? 'All foods' : categoryName} onNavigate={() => props.navigation.navigate('Main')}/>
            <ScrollView style={{paddingVertical: 10}}>
                <FoodByTypeList foods={foods} onViewDetailProduct={onViewDetailProduct} onAddToCart={onAddToCart}/>
            </ScrollView>
            
        </View>
        
    )
}

export default ProductByType;