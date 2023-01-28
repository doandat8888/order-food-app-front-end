import React, { useState } from 'react';
import {Text, View, Image, ImageBackground, TouchableOpacity, TextInput} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import backGround from '../assets/img/background2.jpg';
import {images} from "../constants/index";
import {colors} from '../constants/index';
import {fontSizes} from '../constants/index';
import { UIButton } from '../components';
import {UIInput} from '../components';
import {Validation} from '../utilities/index';
import {HeaderSub} from '../components';
import accountList from '../constants/accountList';
import axios from 'axios';

const Login = (props) => {

    const [inputTypes, setInputTypes] = useState([
        {
            name: 'Email',
            isSelected: true,
            placeholder: 'Enter your email address',
            secure: false,
        },
        {
            name: 'Password',
            isSelected: false,
            placeholder: 'Enter your password',
            secure: true,
        }
    ]);

    const [user, setUser] = useState({})

    const [accounts, setAccounts] = useState(accountList);

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isValidationOK = () => email.length > 0 && password.length > 0 && Validation.isValidEmail(email) === true && Validation.isValidPassword(password) === true;
    const onHandleLogin = async() => {
        const response = await axios.get(`http://192.168.1.187:3000/api/v1/get-user?email=${email}&password=${password}`)
        if(response && response.data && response.data.errCode === 0) {
            setUser(response.data.data);
            if(response.data.data.type === 0) {
                props.navigation.navigate('Main', {userId: response.data.data.id});
            }else {
                props.navigation.navigate('Admin', {userId: response.data.data.type});
            }
        }else {
            alert("Your login information is incorrect. Please try again");
        }
        // const user = accounts.find((account) => account.email === email && account.password === password);
        // if(user) {
        //     props.navigation.navigate('Main', {userId: user.id});
        // }else {
        //     alert("Your login information is incorrect. Please try again")
        // }
    }


    return <View
        style={{
            flex: 1,
           
        }}
    >
        <HeaderSub iconLeft={images.arrowLeft} title={'Login'} onNavigate={() => props.navigation.navigate('WelcomeScreen')}/>
        <View
            style={{
                marginTop: 40,
                marginLeft: 'auto',
                marginRight: 'auto',
                width: 60,
                height: 60,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: colors.gray,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.mainColor,
                marginBottom: 40
            }}
        >
            <Image
                source={images.user}
                style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white'
                }}
            />
        </View>
        {inputTypes.map((inputType, index) => {
            return <View key={index} style={{marginHorizontal: 15}}>
                <Text
                    style={{
                        color: colors.mainColor,
                        marginBottom: 4
                    }}
                >{inputType.name}</Text>
                <TextInput
                    placeholder={inputType.placeholder}
                    placeholderTextColor={colors.gray}
                    pointerEvents='none'
                    onChangeText={(text) => {
                        if(inputType.name === 'Email') {
                            setEmail(text);
                            setErrorEmail(Validation.isValidEmail(text) ? '' : 'Email is not correct format');
                        }else if(inputType.name === 'Password') {
                            setPassword(text);
                            setErrorPassword(Validation.isValidPassword(text) ? '' : 'Password must be at least 6 character');
                        }
                    }}
                    style={{
                        marginBottom: 10,
                        borderWidth: inputType.isSelected ? 1 : 0,
                        borderColor: inputType.isSelected ? colors.mainColor : 'black',
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        paddingVertical: 10
                    }}
                    secureTextEntry={inputType.secure}
                    onTouchStart={() => {
                        let newInputType = inputTypes.map(eachInputType => {
                            return {
                                ...eachInputType,
                                isSelected: eachInputType.name === inputType.name
                            }
                        })
                        setInputTypes(newInputType);
                    }}
                >
                </TextInput>
                <Text
                    style={{
                        color: 'red',
                        marginBottom: 10
                    }}
                >{inputType.name === 'Email' && errorEmail !== '' ? errorEmail : inputType.name === 'Password' && errorPassword !== '' ? errorPassword : ''}</Text>
            </View>
        })}
        <Text
            style={{
                opacity: 0.8,
                marginLeft: 'auto',
                color: colors.mainColor,
                marginHorizontal: 15
            }}
        >Forgot password?</Text>
        <TouchableOpacity
            disabled={isValidationOK() === false}
            onPress={onHandleLogin}
            style={{
                marginTop: 40,
                marginBottom: 20,
                marginLeft: 'auto',
                marginRight: 'auto',
                width: 300,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isValidationOK() === true ? colors.mainColor : colors.gray,
                paddingVertical: 14,
                borderRadius: 20
            }}
        >
            <Text
                style={{
                    color: 'white',
                    fontWeight: 'bold'
                }}
            >Login</Text>
        </TouchableOpacity>
        <Text
            style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                opacity: 0.8
            }}
        >
            Don't have an account ? <Text style={{fontWeight: 'bold'}} onPress={() => props.navigation.navigate('Register')}>Register</Text>
        </Text>
        <View
            style={{
                height: 40,
                marginTop: 40,
                alignItems: 'center',
                flexDirection: 'row',
                marginHorizontal: 20
            }}
        >
            <View style={{height: 1, backgroundColor: colors.gray, flex: 1}}></View>
            <Text
                style={{
                    color: colors.gray
                }}
            >Or login with</Text>
            <View style={{height: 1, backgroundColor: colors.gray, flex: 1}}></View>
            
        </View>
        <View
            style={{
                height: 40,
                width: '100%',
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: 20,
            }}
        >
            <Image 
                source={images.facebookLogo}
                style={{
                    width: 50,
                    height: 50,
                    marginRight: 16
                }}
            />
            <Image 
                source={images.instagramLogo}
                style={{
                    width: 50,
                    height: 50,
                    marginRight: 16
                }}
            />
            <Image 
                source={images.gmailLogo}
                style={{
                    width: 50,
                    height: 50,
                }}
            />
        </View>
    </View>
}
export default Login