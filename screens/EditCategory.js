import { Text, View, Image, TouchableOpacity, TextInput, Modal, Pressable, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { HeaderSub } from "../components";
import { images, colors } from "../constants";
import { useState, useEffect} from "react";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";

const EditCategory = (props) => {

    const route = useRoute();
    const idCategory = (route.params.id);
    const [category, setcategory] = useState({});
    const [categoryNameAdd, setCategoryNameAdd] = useState('');
    const [categoryImgAdd, setCategoryImgAdd] = useState('');
    const [types, setTypes] = useState([]);

    const getAllType = async() => {
        try {
            let response = await axios.get('http://192.168.1.187:3000/api/v1/get-all-type');
            if(response && response.data.errCode === 0) {
                setTypes(response.data.data);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const getDetailCategory = async() => {
        try {
            let response = await axios.get(`http://192.168.1.187:3000/api/v1/get-detail-category?id=${idCategory}`);
            if(response && response.data.errCode === 0) {
                let {name, img} = response.data.data;
                setCategoryNameAdd(name);
                setCategoryImgAdd(img);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onEditCategory = async() => {
        let count = 0;
        let infoArr = [categoryNameAdd, categoryImgAdd]
        for(let i = 0; i < infoArr.length; i++) {
            if(infoArr[i] === '') {
                count++;
            }
        }
        if(count > 0) {
            alert('Missing category info. Please try again')
        }else {
            let categoryMatch = types.find(type => type.name.toLowerCase() === categoryNameAdd.toLowerCase());
            if(categoryMatch && categoryMatch.id !== idCategory) {
                alert('Product has existed. Please try again')
            }else {
                let response = await axios.put('http://192.168.1.187:3000/api/v1/update-category', {
                    id: idCategory,
                    name: categoryNameAdd,
                    img: categoryImgAdd,
                    status: 1
                });
                if(response && response.data && response.data.errCode === 0) {
                    alert("Update category successfully");
                    props.navigation.navigate('Admin');
                }else {
                    alert("Update category failed");
                }
            }
        }
    }

    useEffect(() => {
        getDetailCategory();
        getAllType();
    }, [])

    return (
        <ScrollView>
            <HeaderSub title={'Edit category'} iconLeft={images.arrowLeft} onNavigate={() => props.navigation.navigate('Admin')}/>
            <View style={{marginBottom: 20, padding: 20}}>
                <View style={{marginBottom: 10}}>
                    <Text style={{marginBottom: 6}}>Name</Text>
                    <TextInput placeholder="Enter category's name" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) =>  setCategoryNameAdd(text)} value={categoryNameAdd}/>
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{marginBottom: 6}}>Image</Text>
                    <TextInput placeholder="Enter category's image URL" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) => setCategoryImgAdd(text)} value={categoryImgAdd}/>
                </View>
            </View>
            <Pressable
                style={{backgroundColor: colors.mainColor, marginBottom: 20, paddingVertical: 14, marginHorizontal: 20, borderRadius: 20,}}
                onPress={onEditCategory}>
                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Save</Text>
            </Pressable>
        </ScrollView>
    )
}

export default EditCategory;