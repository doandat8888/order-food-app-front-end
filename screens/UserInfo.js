import { ScrollView, View, Text, Image, Dimensions, TextInput } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { HeaderSub } from "../components";
import { useRoute } from "@react-navigation/native";
import accountList from "../constants/accountList";
import { useState } from "react";
import ButtonMain from "../components/ButtonMain";
import ButtonSub from "../components/ButtonSub";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import axios from "axios";

const UserInfo = (props) => {
    const navigation = useNavigation();
    const {user} = props;
    const [fullName, setFullName] = useState(user.name);
    const [gender, setGender] = useState(user.gender);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [value, setValue] = useState(gender);
    const [userList, setUserList] = useState([]);
    const [genders, setGenders] = useState([
        {key: 1, value: 'Male'},
        {key: 0, value: 'Female'}
    ]);

    const setSelected = (key) => {
        setGender(key);
    }

    const onSaveInfo = async() => {
        let userMatch = userList.find(user => user.name.toLowerCase() === fullName);
        if(userMatch && userMatch.id !== user.id) {
            alert('User has existed. Please try again')
        }else {
            let response = await axios.put(`http://192.168.1.187:3000/api/v1/update-user-info`, {
                id: user.id,
                email: user.email,
                password: user.password,
                name: fullName,
                img: user.img,
                gender: gender,
                phoneNumber: phoneNumber,
                type: 0,
            });
            if(response && response.data.errCode === 0) {
                alert('Update user successfully')
            }
        }
    }

    const onSignOut = () => {
        navigation.navigate('Login')
    }

    const getAllUser = async() => {
        let response = await axios.get(`http://192.168.1.187:3000/api/v1/get-all-user`);
        if(response && response.data.errCode === 0) {
            setUserList(response.data.data);
        }
    }

    useEffect(() => {
        getAllUser();
    }, [])
    

    return (
        <View style={{flex: 1}}>
            <HeaderSub title={'Profile'}/>
            <ScrollView style={{width: '100%', marginBottom: 20,  paddingHorizontal: 20}}>
                <View style={{width: '100%', paddingVertical: 20, alignItems: 'center'}}>
                    <Image style={{width: 80, height: 80, borderRadius: 50}} source={{uri: user.img}}/>
                </View>
                <View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontSize: 14, color: '#636363', marginBottom: 4}}>Full name</Text>
                        <TextInput onChangeText={(text) => setFullName(text)} value={fullName} style={{borderWidth: 0.5, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20}}/>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontSize: 14, color: '#636363', marginBottom: 4}}>Gender</Text>
                        <SelectList 
                            data={genders}
                            setSelected={(key) => setSelected(key)}
                            placeholder={gender === 1 ? 'Male' : 'Female'}
                        />
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontSize: 14, color: '#636363', marginBottom: 4}}>Phone number</Text>
                        <TextInput onChangeText={(text) => setPhoneNumber(text)} value={phoneNumber} style={{borderWidth: 0.5, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20}}/>
                    </View>
                </View>
                <View style={{width: '100%', marginTop: 20}}>
                    <ButtonMain onPress={onSaveInfo} title={'Save'}/>
                </View>
                <View style={{width: '100%', marginTop: 20}}>
                    <ButtonSub onPress={onSignOut} title={'Sign out'}/>
                </View>
            </ScrollView>
            
            
        </View>
    )
}

export default UserInfo;