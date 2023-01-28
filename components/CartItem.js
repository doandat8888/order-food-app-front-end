import { Text, Image, View, Button, TouchableOpacity} from "react-native";
import { useRoute } from "@react-navigation/native";
import { foodList } from "../constants";
import { useEffect, useState } from "react";
import { colors, images } from "../constants";
import { connect, useDispatch } from "react-redux";
import { updateItems, removeItem } from "../reducers/cartItems";

const CartItem = (props) => {
    const dispatch = useDispatch();
    const {food, quantity} = props;
    const [productQuantity, setProductQuantity] = useState(quantity);
    const [total, setTotal] = useState(0);
    const onHandleQuantity = (type) => {
        if(type === 'RAISE') {
            dispatch(updateItems({
                foodInfo: food,
                quantity: productQuantity + 1
            }))
        }else if(type === 'DECREASE') {
            dispatch(updateItems({
                foodInfo: food,
                quantity:  productQuantity === 1 ? productQuantity : productQuantity - 1
            }))
        }
    }

    const onRemoveItemFromCart = () => {
        dispatch(removeItem({
            foodInfo: food,
        }))
    }

    useEffect(() => {
        if(productQuantity < 1) {
            setProductQuantity(1)
        }else {
            setProductQuantity(quantity);
        }
        setTotal(food.price * productQuantity);
    })

    return (
        <View style={{flexDirection: 'row', paddingVertical: 20, paddingHorizontal: 40}}>
            <Image style={{width: 100, height: 100}} source={{uri: food.img}}/>
            <View style={{marginLeft: 20, flex: 1}}>
                <Text style={{fontSize: 16, flex: 1}}>{food.name}</Text>
                <Text style={{fontSize: 18, color: colors.mainColor, flex: 1}}>${food.price}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => onHandleQuantity('DECREASE')} style={{width: 30, height: 30, backgroundColor: '#BEBEBE', alignItems: 'center', justifyContent: 'center'}}><Text style={{color: '#FAFAFA', fontSize: 20, marginTop: 'auto', marginBottom: 'auto'}}>-</Text></TouchableOpacity>
                        <View style={{backgroundColor: '#DADADA', width: 50, height: 30, alignItems: 'center', justifyContent: 'center'}}>
                            <Text>{productQuantity}</Text>
                        </View>
                        <TouchableOpacity onPress={() => onHandleQuantity('RAISE')} style={{width: 30, height: 30, backgroundColor: colors.mainColor, alignItems: 'center', justifyContent: 'center'}}><Text style={{color: '#FAFAFA', fontSize: 20, marginTop: 'auto', marginBottom: 'auto'}}>+</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={onRemoveItemFromCart}>
                        <Image style={{width: 20, height: 20}} source={images.trashIcon}/>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
        
    )
}

export default CartItem;