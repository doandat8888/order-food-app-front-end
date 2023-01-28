import { Text, Image, View, Button, TouchableOpacity} from "react-native";
import { useRoute } from "@react-navigation/native";
import { foodList } from "../constants";
import { useEffect, useState } from "react";
import { colors } from "../constants";
import { connect } from "react-redux";
import CartItem from "./CartItem";


const CartList = (props) => {
    const {data} = props;
    return (
        <View>
            {data.length > 0 ? data.map((cartItem, index) => {
                return (
                    <CartItem key={index} food={cartItem.foodInfo} quantity={cartItem.quantity}/>
                )
            }) : ''}
        </View>
    )
}

export default CartList;