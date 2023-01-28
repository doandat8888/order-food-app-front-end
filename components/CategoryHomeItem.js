import { useState } from "react"
import { ScrollView, View, Text, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { colors, fontSizes, images } from "../constants";

const CategoryHomeItem = (props) => {
    let {source, categoryName} = props;
    const {onPress} = props;
    return (
        <TouchableOpacity
            style={{
                marginHorizontal: 20
            }}
            onPress={onPress}
        >
             <Image 
                source={source}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginLeft: 'auto', 
                    marginRight: 'auto',
                    marginBottom: 6
                }}
            />
            <Text style={{marginLeft: 'auto', marginRight: 'auto', fontSize: fontSizes.h6}}>{categoryName}</Text>
        </TouchableOpacity>
       
    )
}

export default CategoryHomeItem