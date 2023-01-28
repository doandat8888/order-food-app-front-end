import { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, Dimensions, Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, images } from "../constants";
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const Slider = () => {

    const imageSlider = [
        images.slider1,
        images.slider2,
        images.slider3,
        images.slider6,
    ]

    return (
        <View style={{width: width, height: width * 0.5, marginBottom: 20}}>
            <ScrollView
                showsVerticalScrollIndicator={true}
                pagingEnabled
                horizontal
            >   
                {imageSlider.map((item, index) => {
                    return (
                        <Image 
                            key={index}
                            resizeMode='stretch'
                            style={{width: width, height: 0.5 * width}}
                            source={item}
                        >
                        </Image>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default Slider