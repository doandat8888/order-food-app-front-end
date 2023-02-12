import { useState } from "react"
import { ScrollView, View, Text, Image, Dimensions } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { colors, images } from "../constants";
import CategoryHomeItem from "./CategoryHomeItem";
import { FlatList } from "react-native-gesture-handler";
const {width} = Dimensions.get("window");

const CategoryHomeList = (props) => {

    const [screenWidth, setScreenWidth] = useState(0)

    const onContentSizeChange = (contentWidth, contentHeight) => {
        setScreenWidth(contentWidth)
    }

    const onPress = (categoryName) => {
        props.onPressCategoryHomeItem(categoryName);
    }

    const [categoryList, setCategoryList] = useState([
        {
            name: 'Category',
            source: images.categoryImg,
            text: 'Category'
        },
        {
            name: 'Liked',
            source: images.likeImg,
            text: 'Liked'
        },
        {
            name: 'Deal',
            source: images.iconFire,
            text: 'Deal'
        },
        {
            name: 'Your Paypal',
            source: images.paypalIcon,
            text: 'Your paypal'
        },
        {
            name: 'Gift',
            source: images.giftIcon,
            text: 'Gift'
        },
    ])

    const scrollEnabled = screenWidth > width;

    return (
        
        <FlatList
            style={{ 
                flex: 1,
                marginHorizontal: 14,
                flexDirection: 'row',
            }}
            horizontal={true}
            data={categoryList}
            keyExtractor={category => category.name}
            renderItem={category => {
                return <CategoryHomeItem onPress={() => onPress(category.item.text)} categoryName={category.item.text} source={category.item.source}></CategoryHomeItem>
            }}
        >
        </FlatList>
        
    )
}

export default CategoryHomeList