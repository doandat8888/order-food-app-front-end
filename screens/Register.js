import React, { useState } from 'react';
import {ScrollView, Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import backGround from '../assets/img/background2.jpg';
import {images} from "../constants/index";
import {colors} from '../constants/index';
import {fontSizes} from '../constants/index';
import { HeaderSub, UIButton } from '../components';
import {UIInput} from '../components';
import {Validation} from '../utilities/index';
const {height} = Dimensions.get("window");
import axios from 'axios';
import { useEffect } from 'react';
import { SelectList } from "react-native-dropdown-select-list";

const Register = (props) => {

    const [isPress, setIsPress] = useState(false);
    const [screenHeight, setScreenHeight] = useState(0);
    const [userList, setUserList] = useState([]);
    const [genders, setGenders] = useState([
        {key: 1, value: 'Male'},
        {key: 0, value: 'Female'}
    ]);
    const [gender, setGender] = useState(0);

    const [inputTypes, setInputTypes] = useState([
        {
            name: 'Email',
            isSelected: true,
            placeholder: 'Enter your email address',
            secure: false,
            errMessage: errorEmail !== '' ? errorEmail : ''
        },
        {
            name: 'Full name',
            isSelected: false,
            placeholder: 'Enter your full name',
            secure: false,
        },
        {
            name: 'Phone number',
            isSelected: false,
            placeholder: 'Enter your phone number',
            secure: false,
        },
        {
            name: 'Password',
            isSelected: false,
            placeholder: 'Enter your password',
            secure: true,
        },
        {
            name: 'Image url (not required)',
            isSelected: false,
            placeholder: 'Enter your image url',
            secure: false,
        }
    ]);

    const socialLogins = [
        {
            name: 'Facebook',
            source: images.facebookLogo
        },
        {
            name: 'Instagram',
            source: images.instagramLogo
        },
        {
            name: 'Gmail',
            source: images.gmailLogo
        },
    ]

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
    const [errorFullName, setErrorFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [img, setImg] = useState('');
    const isValidationOK = () => email.length > 0 && password.length > 0 && Validation.isValidEmail(email) === true && Validation.isValidPassword(password) === true;

    const validateInputData = (dataType) => {
        let dataMessage = '';
        if(dataType === 'Email') {
            if(errorEmail !== '') {
                dataMessage = errorEmail
            }
        }
        else if(dataType === 'Full name') {
            if(errorFullName !== '') {
                dataMessage = errorFullName
            }
        }else if(dataType === 'Phone number') {
            if(errorPhoneNumber !== '') {
                dataMessage = errorPhoneNumber
            }
        }else if(dataType === 'Password') {
            if(errorPassword !== '') {
                dataMessage = errorPassword
            }
        }
        return dataMessage
    }

    const onContentSizeChange = (contentWidth, contentHeight) => {
        setScreenHeight(contentHeight)
    }

    const onRegister = async() => {
        let count = 0;
        let infoArr = [email, fullName, phoneNumber, password];
        for(let i = 0; i < infoArr.length; i++) {
            if(infoArr[i] === '') {
                count++;
            }
        }
        if(count > 0) {
            alert('Missing info. Please try again')
        }else {
            let userMatch = userList.find(user => user.email === email);
            if(userMatch && userMatch.name !== '') {
                alert('Account has already been registered. Please try again')
            }else {
                let response = await axios.post(`http://192.168.1.187:3000/api/v1/add-new-user`, {
                    id: userList.length + 1,
                    email: email,
                    password: password,
                    name: fullName,
                    img: img !== '' ? img : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
                    gender: gender,
                    phoneNumber: phoneNumber,
                    type: 0,
                });
                if(response && response.data && response.data.errCode === 0) {
                    alert("Add new user successfully");
                }
            }
        }
    }

    const getAllUser = async() => {
        let response = await axios.get(`http://192.168.1.187:3000/api/v1/get-all-user`);
        if(response && response.data.errCode === 0) {
            setUserList(response.data.data);
        }
    }

    const scrollEnabled = screenHeight > height

    useEffect(() => {
        getAllUser();
    }, [])
    
    return <ScrollView
        style={{ flex: 1 }}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={onContentSizeChange}
    >
        <View
            style={{
                flex: 1,
                marginHorizontal: 15,
                overflow: 'scroll'
            }}
        >
            <HeaderSub iconLeft={images.arrowLeft} title={'Register'} onNavigate={() => props.navigation.navigate('WelcomeScreen')}/>
            <View
                style={{
                    marginTop: 20,
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
                return <View key={index}>
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
                        style={{
                            marginBottom: 10,
                            borderWidth: inputType.isSelected ? 1 : 0,
                            borderColor: inputType.isSelected ? colors.mainColor : 'black',
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            paddingVertical: 10
                        }}
                        onChangeText={(text) => {
                            if(inputType.name === 'Email') {
                                setEmail(text);
                                setErrorEmail(Validation.isValidEmail(text) ? '' : 'Email is not correct format');
                            }else if(inputType.name === 'Password') {
                                setPassword(text);
                                setErrorPassword(Validation.isValidPassword(text) ? '' : `Email must be at least 6 character`);
                            }else if(inputType.name === 'Full name') {
                                setFullName(text);
                                setErrorFullName(Validation.isValidFullName(text) ? '' : 'Full name must be at least 8 character');
                            }else if(inputType.name === 'Phone number') {
                                setPhoneNumber(text);
                                setErrorPhoneNumber(Validation.isValidPhoneNumber(text) ? '' : 'Phone number must contain number');
                            }else if(inputType.name === 'Image url (not required)') {
                                setImg(text);
                            }
                            
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
                    >{validateInputData(inputType.name)}</Text>
                </View>
            })}
            <View>
                <Text
                    style={{
                        color: colors.mainColor,
                        marginBottom: 4
                    }}
                >Gender</Text>
                <SelectList 
                    data={genders}
                    setSelected={(key) => setGender(key)}
                    placeholder={'Gender'}
                />
            </View>
           
            <TouchableOpacity
                style={{
                    marginTop: 20,
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
                disabled={isValidationOK() === false}
                onPress={onRegister}
            >
                <Text
                    style={{
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                >Register</Text>
            </TouchableOpacity>
            <Text
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    opacity: 0.8
                }}
            >
                Already have an account ? <Text style={{fontWeight: 'bold'}} onPress={() => props.navigation.navigate('Login')}>Login</Text>
            </Text>
            <View
                style={{
                    height: 40,
                    marginTop: 20,
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginHorizontal: 20
                }}
            >
                <View style={{height: 1, backgroundColor: colors.gray, flex: 1}}></View>
                <Text
                    style={{
                        marginHorizontal: 10,
                        color: colors.gray
                    }}
                >Or register with</Text>
                <View style={{height: 1, backgroundColor: colors.gray, flex: 1}}></View>
                
            </View>
            <View
                style={{
                    height: 40,
                    width: '100%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginTop: 20,
                    marginBottom: 40
                }}
            >
                {socialLogins.map((socialLogin, index) => {
                    return (
                        <Image 
                            key={index}
                            source={socialLogin.source}
                            style={{
                                width: 50,
                                height: 50,
                                marginRight: 16
                            }}
                        />
                    )
                   
                })}
            </View>
        </View>
    </ScrollView>
    
}
export default Register