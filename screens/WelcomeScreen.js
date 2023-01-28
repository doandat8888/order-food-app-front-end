import React, { useState } from 'react';
import {Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
 
import iconFire from '../assets/img/fire.png';
import iconQuestion from '../assets/img/help.png';
import backGround from '../assets/img/background2.jpg';
import {colors, images} from "../constants/index";
import { UIButton } from '../components';
import { ScrollView } from 'react-native-gesture-handler';


const WelcomeScreen = (props) => {

    const onPressLoginBtn = () => {
        props.navigation.navigate('Login');
    }

    return (
        <View style={{
            backgroundColor: 'white',
            flex: 100
        }}>
            <ImageBackground    //chứa 1 ảnh đứng sau tất cả các thẻ
                source={images.background}
                resizeMode='cover'
                style={{
                    flex: 100,  //Chiếm toàn bộ phần còn lại
                }}
            >
                <View
                    style={{
                        flexDirection: 'row', //Nhớ nha
                        flex: 20,
                        //backgroundColor: '#0081FF',
                        alignItems: 'flex-start',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 100,
                            marginTop: 10
                        }}
                    >
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'column', 
                        height: 50,
                        flex: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        //backgroundColor: 'red'
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20,
                            marginBottom: 10
                        }}
                    >
                        Welcome to
                    </Text>
                    <Text
                        style={{
                            color: colors.mainColor,
                            fontSize: 50,
                            marginBottom: 10,
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                        }}
                    >
                        Pizza italy
                    </Text>
                </View>
                <View
                    style={{
                        height: 50,
                        flex: 40,
                        //backgroundColor: 'purple',
                    }}
                >   
                </View>
                <View
                    style={{
                        flex: 20,
                    }}
                >
                    <UIButton 
                        onPress={onPressLoginBtn}
                        isSelected={false}
                        textDisplay={'Login'.toUpperCase()}
                        color={'white'}
                        backgroundColor={colors.mainColor}
                        fontWeight={'bold'}
                        fontSize={16}
                        borderRadius={20}
                    />
                    <Text
                        style={{
                            flex: 100,
                            textAlign: 'center',
                            color: 'white',
                            lineHeight: 50
                        }}
                    >
                        Dont have an account? <Text style={{fontWeight: 'bold'}} onPress={() => props.navigation.navigate('Register')}>Register</Text>
                    </Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export default WelcomeScreen