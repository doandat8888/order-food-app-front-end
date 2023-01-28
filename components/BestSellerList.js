import { useEffect, useState } from "react"
import { ScrollView, View, Text, Image, Dimensions } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { colors, images } from "../constants";
import { FlatList } from "react-native-gesture-handler";
import BestSellerItem from "./BestSellerItem";
import bestSelllerList from "../constants/bestSellerList";
import {foodList} from "../constants";
const {width} = Dimensions.get("window");



const BestSellerList = (props) => {
    const {foods} = props;
    const [bestSellerFoods, setBestSellerFood] = useState([]);
    
    useEffect(() => {
        if(foods && foods.length > 0) {
            setBestSellerFood(foods);
        }
        console.log("Best seller foods: ", bestSellerFoods);
    })

    const onPressProductItem = (idProduct) => {
        props.onPressProductItem(idProduct);
    }

    return (
        <FlatList
            style={{ 
                flex: 1,
                flexDirection: 'row',
            }}
            horizontal
            data={bestSellerFoods}
            keyExtractor={bestSeller => bestSeller.name}
            renderItem={bestSeller => {
                return bestSeller.item.statusFood === 1 ?  <BestSellerItem bestSeller={bestSeller} source={bestSeller.item.img} name={bestSeller.item.name} price={bestSeller.item.price} id={bestSeller.item.id} onPressProductItem={onPressProductItem}></BestSellerItem> : ''
            }}
        >
        </FlatList>
    )
}

export default BestSellerList