import { Text, Image, View, Button, TouchableOpacity} from "react-native";
import { useRoute } from "@react-navigation/native";
import { foodList } from "../constants";
import { useEffect, useState } from "react";
import { colors, images } from "../constants";
import { connect, useDispatch } from "react-redux";
import { addItems } from "../reducers/cartItems";
import axios from "axios";
import Foods from "./Foods";

const DetailProduct = (props) => {
    const dispatch = useDispatch();
    const route = useRoute();

    const idProduct = (route.params.id);
    //const food = foođs.find((food) => food.id === idProduct)
    const [food, setFood] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [foodInfo, setFoodInfo] = useState({});

    const getDetailFood = async() => {
        try {
            let response = await axios.get(`http://192.168.1.187:3000/api/v1/get-detail-food?id=${idProduct}`);
            if(response && response.data.errCode === 0) {
                setFood(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onHandleQuantity = (type) => {
        if(type === 'RAISE') {
            setQuantity(quantity + 1);
        }else if(type === 'DECREASE') {
            if(quantity >= 1) {
                setQuantity(quantity - 1);
            }else {
                setQuantity(1);
            }
        }
    }

    const onAddToCart = () => {
        props.navigation.navigate('Cart');
        dispatch(addItems({
            foodInfo: foodInfo,
            quantity: quantity
        }))
    }

    const gotoPreviousPage = () => {
        props.navigation.navigate('Main');
    }

    useEffect(() => {
        getDetailFood();
        if(food && food.name !== '') {
            setFoodInfo(food);
        }
        if(quantity < 1) {
            setQuantity(1)
        }
        setTotal(foodInfo.price * quantity);
    }, [food])

    return (
        <View style={{flex: 1}}>
            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', position: 'absolute', top: '4%', left: '4%', zIndex: 2000, backgroundColor: '#606161', paddingVertical: 8, paddingHorizontal: 8, borderRadius: 50, opacity: 0.7}} onPress={gotoPreviousPage}>
                <Image style={{width: 20, height: 20, tintColor: '#FFFFFF'}} source={images.arrowLeft1}/>
            </TouchableOpacity>
            
            <Image source={{uri: foodInfo.img}} style={{width: '100%', height: 300}}/>
            <View style={{paddingHorizontal: 20, borderBottomColor: '#DADADA', borderBottomWidth: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, width: '100%'}}>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>{foodInfo.name}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
                    <Text style={{color: colors.mainColor, fontSize: 32}}>$ {foodInfo.price}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => onHandleQuantity('DECREASE')} style={{width: 30, height: 30, backgroundColor: '#BEBEBE', alignItems: 'center', justifyContent: 'center'}}><Text style={{color: '#FAFAFA', fontSize: 20, marginTop: 'auto', marginBottom: 'auto'}}>-</Text></TouchableOpacity>
                        <View style={{backgroundColor: '#DADADA', width: 50, height: 30, alignItems: 'center', justifyContent: 'center'}}>
                            <Text>{quantity}</Text>
                        </View>
                        <TouchableOpacity onPress={() => onHandleQuantity('RAISE')} style={{width: 30, height: 30, backgroundColor: colors.mainColor, alignItems: 'center', justifyContent: 'center'}}><Text style={{color: '#FAFAFA', fontSize: 20, marginTop: 'auto', marginBottom: 'auto'}}>+</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
            <Text style={{fontSize: 18, marginVertical: 20, marginHorizontal: 20}}>{foodInfo.description}</Text>
            <View style={{flex: 1, position: 'absolute', left: 0, right: 0, bottom: 0, height: 100, borderTopColor: '#DADADA', borderTopWidth: 1, paddingVertical: 20, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
                <Text style={{fontSize: 20}}>Total: <Text style={{color: colors.mainColor}}>${total}</Text></Text>
                <TouchableOpacity onPress={onAddToCart} style={{width: '50%', height: 60, backgroundColor: 'red', borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 20, color: '#FAFAFA'}}>ADD TO CART</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

export default DetailProduct;