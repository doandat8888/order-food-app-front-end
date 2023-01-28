import React from 'react';
import {Text, View, Image, ImageBackground, TouchableOpacity, TextInput} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import iconFire from '../assets/img/fire.png';
import iconQuestion from '../assets/img/help.png';
import backGround from '../assets/img/background2.jpg';
import {images} from "../constants/index";
import fontSizes from './fontSizes';
import {colors} from "../constants/index";

const UIInput = (props) => {
    return <TextInput 
        style={{
            borderColor: props.borderColor ? props.borderColor : 'white',
            height: 45,
            borderWidth: 1,
            borderRadius: 5,
            marginHorizontal: props.marginHorizontal ? props.marginHorizontal : 15,
            marginVertical: props.marginVertical ? props.marginVertical : 15,
            marginTop: props.marginTop ? props.marginTop : 0,
            marginBottom: props.marginBottom ? props.marginBottom : 0,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: props.isSelected ? 'white' : props.backgroundColor ? props.backgroundColor : 'transparent',
        }}
        onPress={props.onPress}
    >
        <Text
            style={{
                color: props.isSelected ? colors.mainColor : 'white',
                fontSize: fontSizes.h5
            }}
        >{props.textDisplay}
        </Text>
    </TextInput>
}

export default UIInput