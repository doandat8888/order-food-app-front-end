import { Text, Image, View, Button, TouchableOpacity} from "react-native";
import { useRoute } from "@react-navigation/native";
import { foodList } from "../constants";
import { useEffect, useState } from "react";
import { colors } from "../constants";
import { connect } from "react-redux";
import LikedItem from "./LikedItem";


const LikedList = (props) => {
    const {data} = props;

    const onViewDetailProduct = (idProduct) => {
        props.onViewDetailProduct(idProduct);
    }

    return (
        <View>
            {data.length > 0 ? data.map((cartItem, index) => {
                return (
                    <LikedItem key={index} food={cartItem.foodInfo} onViewDetailProduct={onViewDetailProduct}/>
                )
            }) : ''}
        </View>
    )
}

export default LikedList;