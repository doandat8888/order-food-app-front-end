import { Text, View, Image, TouchableOpacity, TextInput, Modal, Pressable, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { HeaderSub } from "../components";
import { images, colors } from "../constants";
import { useState, useEffect} from "react";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";

const EditProduct = (props) => {

    const route = useRoute();
    const idProduct = (route.params.id);
    const [food, setFood] = useState({});
    const [foodInfo, setFoodInfo] = useState({});
    const [types, setTypes] = useState([]);
    const [statusAdd, setStatusAdd] = useState('');
    const [productNameAdd, setProductNameAdd] = useState('');
    const [productPriceAdd, setProductPriceAdd] = useState(0);
    const [productQuantityAdd, setProductQuantityAdd] = useState(0);
    const [productImgAdd, setProductImgAdd] = useState('');
    const [productSocialsAdd, setProductSocialsAdd] = useState('');
    const [productDesAdd, setProductDesAdd] = useState('');
    const [typeAdd, setTypeAdd] = useState('');
    const [typeArr, setTypeArr] = useState([]);
    const [foods, setFoods] = useState([]);
    

    const [statusArr, setStatusArr] = useState([
        {key: 0, value: 'Coming soon'},
        {key: 1, value: 'Closing soon'},
        {key: 2, value: 'Opening now'},
    ]);

    const onSelected = (key, type) => {
        if(type === 'status') {
            const statusSelect = statusArr.find(status => status.key === key);
            setStatusAdd(statusSelect.value);
        }else if(type === 'type') {
            const typeSelect = setValueTypeArr().find(type => type.key === key);
            setTypeAdd(typeSelect.value);
        }
        
    }

    const getAllType = async() => {
        try {
            let response = await axios.get('http://192.168.1.187:3000/api/v1/get-all-type');
            if(response && response.data.errCode === 0) {
                setTypes(response.data.data);
                let typeArrNew = [];
                for(let i = 0; i < types.length; i++) {
                    let typeObj = {
                        key: types[i].id,
                        value: types[i].name
                    }
                    typeArrNew.push(typeObj);
                }
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const getAllFood = async() => {
        try {
            let response = await axios.get('http://192.168.1.187:3000/api/v1/get-all-food');
            if(response) {
                setFoods(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getDetailFood = async() => {
        try {
            let response = await axios.get(`http://192.168.1.187:3000/api/v1/get-detail-food?id=${idProduct}`);
            if(response && response.data.errCode === 0) {
                let {name, price, status, type, img, socials, description, quantity} = response.data.data;
                setProductNameAdd(name);
                setProductPriceAdd(price);
                setStatusAdd(status);
                setTypeAdd(type);
                setProductImgAdd(img);
                setProductSocialsAdd(socials);
                setProductDesAdd(description);
                setProductQuantityAdd(quantity);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const setValueTypeArr = () => {
        let typeArrNew = [];
        for(let i = 0; i < types.length; i++) {
            let typeObj = {
                key: types[i].id,
                value: types[i].name
            }
            typeArrNew.push(typeObj);
        }
        return typeArrNew;
    }

    const onEditProduct = async() => {
        let count = 0;
        let infoArr = [productNameAdd, productPriceAdd, statusAdd, productImgAdd, productSocialsAdd, productDesAdd, typeAdd]
        for(let i = 0; i < infoArr.length; i++) {
            if(infoArr[i] === '') {
                count++;
            }
        }
        if(count > 0) {
            alert('Missing product info. Please try again')
        }else {
            let productMatch = foods.find(food => food.name.toLowerCase() === productNameAdd.toLowerCase());
            if(productMatch && productMatch.id !== idProduct) {
                alert('Product has existed. Please try again')
            }else {
                let response = await axios.put('http://192.168.1.187:3000/api/v1/update-food', {
                    id: idProduct,
                    name: productNameAdd,
                    price: productPriceAdd,
                    quantity: productQuantityAdd,
                    status: statusAdd,
                    type: typeAdd,
                    img: productImgAdd,
                    socials: productSocialsAdd,
                    description: productDesAdd,
                    statusFood: 1
                });
                if(response && response.data && response.data.errCode === 0) {
                    alert("Update food successfully");
                    props.navigation.navigate('Admin', {
                        msg: 'Edit food successfully'
                    });
                }else {
                    alert("Update food failed");
                }
            }
           
        }
    }

    useEffect(() => {
        getAllType();
        getDetailFood();
        getAllFood();
    }, [])

    return (
        <ScrollView>
            <HeaderSub title={'Edit product'} iconLeft={images.arrowLeft} onNavigate={() => props.navigation.navigate('Admin')}/>
            <View style={{marginBottom: 20, padding: 20}}>
                <View style={{marginBottom: 10}}>
                    <Text style={{marginBottom: 6}}>Name</Text>
                    <TextInput placeholder="Enter product's name" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) =>  setProductNameAdd(text)} value={productNameAdd}/>
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{marginBottom: 6}}>Price</Text>
                    <TextInput placeholder="Enter product's price" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) => setProductPriceAdd(text)} value={productPriceAdd.toString()}/>
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{marginBottom: 6}}>Quantity</Text>
                    <TextInput placeholder="Enter product's quantity" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) => setProductPriceAdd(text)} value={productQuantityAdd.toString()}/>
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{fontSize: 14, color: '#636363', marginBottom: 4}}>Status</Text>
                    <SelectList 
                        data={statusArr}
                        setSelected={(key) => onSelected(key, 'status')}
                        placeholder={statusAdd}
                    />
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{fontSize: 14, color: '#636363', marginBottom: 4}}>Type</Text>
                    <SelectList 
                        data={setValueTypeArr}
                        setSelected={(key) => onSelected(key, 'type')}
                        placeholder={typeAdd}
                    />
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{marginBottom: 6}}>Image</Text>
                    <TextInput placeholder="Enter product's image URL" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) => setProductImgAdd(text)} value={productImgAdd}/>
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{marginBottom: 6}}>Socials</Text>
                    <TextInput placeholder="Enter product's socials" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) => setProductSocialsAdd(text)} value={productSocialsAdd}/>
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{marginBottom: 6}}>Description</Text>
                    <TextInput placeholder="Enter product's description" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) => setProductDesAdd(text)} value={productDesAdd}/>
                </View>
            </View>
            <Pressable
                style={{backgroundColor: colors.mainColor, marginBottom: 20, paddingVertical: 14, marginHorizontal: 20, borderRadius: 20,}}
                onPress={onEditProduct}>
                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Save</Text>
            </Pressable>
        </ScrollView>
    )
}

export default EditProduct;