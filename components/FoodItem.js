import { useState } from "react"
import { ScrollView, View, Text, Image, Dimensions } from "react-native";
import { TextInput} from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { colors, images } from "../constants";

const FoodItem = (props) => {
    const {onPress} = props;
    const socialStr = props.food.socials;
    const socials = socialStr !== '' ?  socialStr.split(', ') : [];
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: "row",
                paddingHorizontal: 14,
                height: 140,
            }}
        >
            <Image 
                source={{uri: props.food.img}} 
                style={{
                    width: 90,
                    height: 90,
                    marginRight: 12,
                    borderRadius: 10
                }}
            />
            <View>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}
                >
                    {props.food.name}
                </Text>
                <View style={{width: 240, height: 1, backgroundColor: 'black'}}></View>
                <Text style={{color: 'gray'}}>
                    Status: <Text style={{color: props.food.status === 'Opening now' ? 'green' : props.food.status === 'Coming soon' ? 'orange' : 'red'}}>{props.food.status.toUpperCase()}</Text>
                </Text>
                <Text style={{color: 'gray'}}>
                    Price: {props.food.price}$
                </Text>
                <Text style={{color: 'gray'}}>
                    Foodtype: {props.food.type}
                </Text>
                <View style={{flexDirection: 'row'}}>
                    {socials.map((social, index) => {
                        for(let i = 0; i < props.socialIcons.length; i++) {
                            if(social === props.socialIcons[i].name) {
                                return <Image key={index} source={props.socialIcons[i].img} style={{width: 16, height: 16, marginRight: 6, tintColor: 'gray'}}></Image>
                            }
                        }
                    })}
                </View>
            </View>
        </TouchableOpacity>
       
    )
}

export default FoodItem
