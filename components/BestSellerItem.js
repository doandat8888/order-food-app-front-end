import { colors, images } from "../constants";
import { Image, TouchableOpacity, Text } from "react-native";


const BestSellerItem = (props) => {

    let {id, name, price, source, bestSeller} = props;
    //const sourceImg = require('');
    //const sourceImg = `../assets/img/pizza-italya.jpg`;

    const onPressProductItem = (idProduct) => {
        props.onPressProductItem(idProduct);
    }

    return (
        <TouchableOpacity onPress={() => onPressProductItem(id)}>
            <Image source={{uri: source}} style={{width: 140, height: 140, marginHorizontal: 16, borderRadius: 10, resizeMode: 'cover'}}></Image>
            <Text numberOfLines={1} style={{marginVertical: 8, marginLeft: 20, fontWeight: 'bold', width: 140}}>{name}</Text>
            <Text style={{marginLeft: 20, color: colors.mainColor}}>{price}$</Text>
        </TouchableOpacity>
    )
}

export default BestSellerItem;