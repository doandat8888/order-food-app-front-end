import { useEffect, useState } from "react"
import { ScrollView, View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { colors, images } from "../constants";
import { FlatList } from "react-native-gesture-handler";
import BestSellerItem from "./BestSellerItem";
import bestSelllerList from "../constants/bestSellerList";
import {foodList} from "../constants";
import { color } from "react-native-reanimated";

const FoodByTypeItem = (props) => {
    let {food} = props;

    const onViewDetailProduct = () => {
        props.onViewDetailProduct(food.id);
    }

    const onAddToCart = () => {
        props.onAddToCart(food, 1);
    }

    return (
        <TouchableOpacity style={{borderWidth: 0.5, borderRadius: 20, marginHorizontal: 20, marginVertical: 20, paddingBottom: 8, borderColor: 'black'}} onPress={onViewDetailProduct}>
            <Image source={{uri: food.img}} style={{width: '100%', height: 160, borderTopLeftRadius: 20, borderTopRightRadius: 20}}/>
            <View style={{paddingHorizontal: 8}}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize: 16, fontWeight: '500', marginVertical: 10}}>{food.name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{color: colors.mainColor, fontSize: 16, fontWeight: 'bold'}}>${food.price}</Text>
                    <TouchableOpacity style={{width: 30, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.mainColor, borderRadius: 50}} onPress={onAddToCart}>
                        <Image source={images.plusIcon} style={{width: 20, height: 20, tintColor: 'white'}}/>
                    </TouchableOpacity>
                </View>
                
            </View>
            
        </TouchableOpacity>
    )
}

export default FoodByTypeItem;