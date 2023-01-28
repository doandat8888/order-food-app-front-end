import React from 'react';
import {Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import iconFire from '../assets/img/fire.png';
import iconQuestion from '../assets/img/help.png';
import backGround from '../assets/img/background2.jpg';
import {images} from "../constants/index";
import fontSizes from './fontSizes';
import {colors} from "../constants/index";

const UIButton = (props) => {
    return <TouchableOpacity 
        style={{
            borderColor: props.borderColor ? props.borderColor : 'white',
            height: 45,
            borderWidth: props.borderWidth ? props.borderWidth : 0,
            borderRadius: props.borderRadius ? props.borderRadius : 0,
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
        <Image 
            source={props.isSelected ? images.iconChecked : props.source ? props.source : ''}
            style={{
                width: 20,
                height: 20,
                position: 'absolute',
                left: 10,
                tintColor: props.tintColor ? props.tintColor : 'green'
            }}
            
        />
        <Text
            style={{
                color: props.color ? props.color : 'white',
                fontSize: props.fontSize ? props.fontSize : fontSizes.h5,
                fontWeight: props.fontWeight ? props.fontWeight : ''
            }}
        >{props.textDisplay}
        </Text>
    </TouchableOpacity>
}

export default UIButton