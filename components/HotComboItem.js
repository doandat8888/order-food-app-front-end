import { colors, images } from "../constants";
import { Image, TouchableOpacity, Text } from "react-native";

const HotComboItem = (props) => {
    return (
        <TouchableOpacity>
            <Image source={props.source} style={{width: 140, height: 140, marginHorizontal: 16, borderRadius: 10}}></Image>
            <Text numberOfLines={1} style={{marginVertical: 8, marginLeft: 20, fontWeight: 'bold', width: 140}}>{props.name}</Text>
            <Text style={{marginLeft: 20, color: colors.mainColor}}>{props.price}$</Text>
        </TouchableOpacity>
    )
}

export default HotComboItem;