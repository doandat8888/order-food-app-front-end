import { Text, Image, View, Button, TouchableOpacity} from "react-native";
import { useRoute } from "@react-navigation/native";
import { foodList } from "../constants";
import { useEffect, useState } from "react";
import { colors, images } from "../constants";
import { connect, useDispatch } from "react-redux";
import { updateItems, removeItem } from "../reducers/cartItems";
import { removeLikeItem } from "../reducers/likeItems";

const LikedItem = (props) => {
    const dispatch = useDispatch();
    const {food} = props;
    const onRemoveItemFromCart = () => {
        dispatch(removeLikeItem({
            foodInfo: food,
        }))
    }

    const onViewDetailProduct = (idProduct) => {
        props.onViewDetailProduct(idProduct);
    }

    return (
        <TouchableOpacity onPress={() => onViewDetailProduct(food.id)}>
            <View style={{flexDirection: 'row', paddingVertical: 20}}>
                <Image style={{width: 100, height: 100}} source={{uri: food.img}}/>
                <View style={{marginLeft: 20, flex: 1}}>
                    <Text style={{fontSize: 16, flex: 1}}>{food.name}</Text>
                    <Text style={{fontSize: 18, color: colors.mainColor, flex: 1}}>${food.price}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <TouchableOpacity onPress={onRemoveItemFromCart}>
                            <Image style={{width: 20, height: 20}} source={images.trashIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        
        
    )
}

export default LikedItem;