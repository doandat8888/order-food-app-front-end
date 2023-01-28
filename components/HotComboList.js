import { useState } from "react"
import { ScrollView, View, Text, Image, Dimensions } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { colors, images } from "../constants";
import { FlatList } from "react-native-gesture-handler";
import HotComboItem from "../components/HotComboItem";
import hotComboList from "../constants/hotComboList";
import foodList from "../constants";
const {width} = Dimensions.get("window");



const HotComboList = (props) => {

    const [hotComboFoods, setHotComboFood] = useState(hotComboList);

    return (
        <FlatList
            style={{ 
                flex: 1,
                flexDirection: 'row',
            }}
            horizontal={true}
            data={hotComboFoods}
            keyExtractor={hotComboFood => hotComboFood.name}
            renderItem={hotComboFood => {
                return <HotComboItem key={hotComboFood.index} source={hotComboFood.item.img} name={hotComboFood.item.name} price={hotComboFood.item.price}></HotComboItem>
            }}
        >
        </FlatList>
    )
}

export default HotComboList