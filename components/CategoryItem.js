import { useState } from "react"
import { ScrollView, View, Text, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { colors, fontSizes, images } from "../constants";

const CategoryItem = (props) => {
    let {source, categoryName} = props;
    const {onPress} = props;
    return (
        <TouchableOpacity
            style={{
                marginRight: 10
            }}
            onPress={onPress}
        >
             <Image 
                source={{uri: source}}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginLeft: 'auto', 
                    marginRight: 'auto',
                    marginBottom: 6
                }}
            />
            <Text style={{marginLeft: 'auto', marginRight: 'auto', fontSize: fontSizes.h6}}>{categoryName === '' ? 'All' : categoryName}</Text>
        </TouchableOpacity>
       
    )
}

export default CategoryItem