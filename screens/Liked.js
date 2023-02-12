import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { connect, useSelector } from "react-redux";
import { HeaderSub } from "../components";
import LikedList from "../components/LikedList";
import { colors, images } from "../constants";
import cartItems from "../reducers/cartItems";

const Liked = (props) => {
    const data = useSelector(item => item.likeItems.value);
    useEffect(() => {
        // const carts = props.cartItems;
        // setCartFoods(carts)
    })

    const onViewDetailProduct = (idProduct) => {
        props.navigation.navigate('DetailProduct', {
            id: idProduct
        })
    }

    return (
        <View style={{paddingBottom: 20, flex: 1}}>
            <HeaderSub iconLeft={images.arrowLeft} title={'Liked'} onNavigate={() => props.navigation.navigate('Main')}/>
            <ScrollView style={{paddingVertical: 20, paddingHorizontal: 40}}>
                {data.length > 0 ? 
                    <LikedList onViewDetailProduct={onViewDetailProduct} data={data}/>
                : <Text>You'd never liked any foods</Text>}
            </ScrollView>
        </View>
    )
}


export default Liked;