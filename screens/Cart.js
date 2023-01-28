import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { connect, useSelector } from "react-redux";
import { HeaderSub } from "../components";
import CartItem from "../components/CartItem";
import CartList from "../components/CartList";
import { colors, images } from "../constants";
import cartItems from "../reducers/cartItems";

const Cart = (props) => {
    const data = useSelector(item => item.cartItems.value);
    const [totalMoney, setTotalMoney] = useState(0);
    useEffect(() => {
        // const carts = props.cartItems;
        // setCartFoods(carts)
        setTotalMoney(data.reduce((accumulator, item) => accumulator + (item.quantity * item.foodInfo.price), 0));
    })
    return (
        <View style={{paddingVertical: 20, flex: 1}}>
            <HeaderSub iconLeft={images.arrowLeft} title={'Cart'} onNavigate={() => props.navigation.navigate('Main')}/>
            
            <ScrollView>
                {data.length > 0 ? 
                    <CartList data={data}/>
                : <Text>No foods in your cart</Text>}
            </ScrollView>
            <View style={{backgroundColor: '#FAFAFA', position: 'relative', bottom: 0, borderTopColor: '#DADADA', borderTopWidth: 1, paddingVertical: 20, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
                <Text style={{fontSize: 20}}>Total: <Text style={{color: colors.mainColor}}>${totalMoney}</Text></Text>
                <TouchableOpacity style={{width: '50%', height: 60, backgroundColor: 'red', borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 20, color: '#FAFAFA'}}>CHECK OUT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default Cart;