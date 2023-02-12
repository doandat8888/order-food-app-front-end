import { useEffect, useState } from "react"
import { ScrollView, View, Text, Image, Dimensions } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { colors, images } from "../constants";
import { FlatList } from "react-native-gesture-handler";
import {foodList} from "../constants";
import FoodByTypeItem from "./FoodByTypeItem";

const FoodByTypeList = (props) => {
    let {foods} = props;

    const onViewDetailProduct = (idProduct) => {
        props.onViewDetailProduct(idProduct);
    }

    const onAddToCart = (food, quantity) => {
        props.onAddToCart(food, quantity);
    }

    return (
       
            <View style={{flexDirection: 'row', width: '100%', flexWrap: 'wrap'}}>
                {foods && foods.length > 0 && foods.map((food, index) =>  {
                    return (
                        <View style={{width: '50%'}}>
                            <FoodByTypeItem key={index} food={food} onViewDetailProduct={onViewDetailProduct} onAddToCart={onAddToCart}/>
                        </View>
                        
                    )
                })}
            </View>
            
        
    )
}

export default FoodByTypeList;