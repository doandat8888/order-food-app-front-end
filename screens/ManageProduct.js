import { Text, View, Image, TouchableOpacity, TextInput, Modal, Pressable, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import HeaderSub from "../components/headerSub";
import { images, colors } from "../constants";
import axios from "axios";
import { FlatList} from "react-native-gesture-handler";
import FoodAdminItem from "../components/FoodAdminItem";
import { SelectList } from "react-native-dropdown-select-list";
import ButtonMain from "../components/ButtonMain";
import { useNavigation } from "@react-navigation/native";

const ManageProduct = (props) => {
    const route = useRoute();
    //const idUser = route && route.params && route.params.userId ? route.params.userId : '';
    const navigation = useNavigation();
    const {idUser, msg} = props;
    const [user, setUser] = useState({});
    const [foods, setFoods] = useState([]);
    const [types, setTypes] = useState([]);
    const [foodNameTxt, setFoodNameTxt] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [statusAdd, setStatusAdd] = useState('');
    const [productNameAdd, setProductNameAdd] = useState('');
    const [productPriceAdd, setProductPriceAdd] = useState(0);
    const [productImgAdd, setProductImgAdd] = useState('');
    const [productSocialsAdd, setProductSocialsAdd] = useState('');
    const [productDesAdd, setProductDesAdd] = useState('');
    const [productQuantityAdd, setProductQuantityAdd] = useState(0);
    const [typeAdd, setTypeAdd] = useState('');
    const [typeArr, setTypeArr] = useState([]);
    const [messageEditProduct, setMessagEditProduct] = useState('');

    const [statusArr, setStatusArr] = useState([
        {key: 0, value: 'Coming soon'},
        {key: 1, value: 'Closing soon'},
        {key: 2, value: 'Opening now'},
    ]);
    
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

    const setMessage = () => {
        if(msg !== '') {
            setMessagEditProduct(msg)
        }
    }
    
    const refreshFood = () => {
        if(messageEditProduct !== '') {
            getAllFood();
        }
    }

    useEffect(() => {
        getUserInfo();
        getAllFood();
        getAllType();
        setMessage();
        //refreshFood();
    }, [msg])

    const getUserInfo = async() => {
        let response = await axios.get(`http://192.168.1.187:3000/api/v1/get-user-by-id?id=${idUser}`);
        if(response && response.data.errCode === 0) {
            setUser(response.data.data);
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
                console.log("Type arr", typeArr)
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const filterFood = () => {
        return foods && foods.length > 0 ? foods.filter(food => food.name.toLowerCase().includes(foodNameTxt.toLowerCase())) : foods;
    }

    const onAddProduct = async () => {
        let count = 0;
       
        let infoArr = [productNameAdd, productPriceAdd, statusAdd, productImgAdd, productSocialsAdd, productDesAdd, typeAdd, productQuantityAdd]
        for(let i = 0; i < infoArr.length; i++) {
            if(infoArr[i] === '') {
                count++;
            }
        }
        if(count > 0) {
            alert('Missing product info. Please try again')
        }else {
            let productMatch = foods.find(food => food.name.toLowerCase() === productNameAdd.toLowerCase());
            if(productMatch && productMatch.name !== '') {
                alert('Product has existed. Please try again')
            }else {
                let response = await axios.post('http://192.168.1.187:3000/api/v1/add-new-food', {
                    id: foods.length + 1,
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
                    alert("Add new product successfully");
                    setModalVisible(!modalVisible);
                    getAllFood();
                }else {
                    alert("Add new product failed");
                }
            }
            
        }
        
    }

    const onSelected = (key, type) => {
        if(type === 'status') {
            const statusSelect = statusArr.find(status => status.key === key);
            setStatusAdd(statusSelect.value);
        }else if(type === 'type') {
            const typeSelect = setValueTypeArr().find(type => type.key === key);
            setTypeAdd(typeSelect.value);
        }
        
    }

    const onEditProduct = (idProduct) => {
        props.onEditProduct(idProduct);
    }

    const onDeleteProduct = async(idProduct) => {
        let response = await axios.put('http://192.168.1.187:3000/api/v1/delete-food', {
            id: idProduct,
            statusFood: 0,
        });
        if(response && response.data && response.data.errCode === 0) {
            alert("Delete food successfully");
            getAllFood();
        }else {
            alert("Delete food failed");
        }
    }

    return (
        <ScrollView style={{flex: 1}}>
           <HeaderSub iconLeft={images.arrowLeft} title={'Manage Product'} onNavigate={() => navigation.navigate('Login')}/>
           <View style={{width: '100%', marginBottom: 20}}>
                <View style={{width: '100%', paddingVertical: 20, alignItems: 'center'}}>
                    <Image style={{width: 80, height: 80, borderRadius: 50}} source={{uri: user.img}}/>
                    <Text style={{marginTop: 20}}>Welcome back, {user.name}!</Text>
                </View>
                <View style={{marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                    <View 
                        style={{
                            height: 40,
                            backgroundColor: 'white',
                            paddingHorizontal: 10,
                            zIndex: 1,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'transparent',
                            
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '80%'
                        }}>
                        <View>
                            <TouchableOpacity>
                                <Image
                                    source={images.searchIcon}
                                    style={{
                                        width: 20,
                                        height: 20, 
                                    }}
                                >
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={{
                                flex: 1,
                                marginLeft: 8
                            }}
                            placeholder='Search'
                            onChangeText={(text) => setFoodNameTxt(text)}
                        > 
                        </TextInput>
                    </View>
                    <View style={{flex: 1, marginLeft: 10}}>
                        <TouchableOpacity style={{flexDirection: 'row', paddingVertical: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.mainColor, borderRadius: 10}} onPress={() => setModalVisible(true)}>
                            <Image source={images.plusIcon} style={{width: 20, height: 20, tintColor: 'white'}}/>
                            <Text style={{color: '#FFFFFF'}}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
               <View style={{paddingVertical: 20}}>
                    {filterFood() && filterFood().length > 0 ? filterFood().map((item, index) => item.statusFood === 1 ? <FoodAdminItem id={item.id} onDeleteProduct={() => onDeleteProduct(item.id)} onEditProduct={() => onEditProduct(item.id)} key={index} index={index} image={item.img} name={item.name} price={item.price} type={item.type} /> : '') : ''}
               </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                }}>
                <ScrollView contentContainerStyle={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <View style={{width: '90%', margin: 20,backgroundColor: 'white', borderRadius: 20, paddingVertical: 20, paddingHorizontal: 30, shadowColor: '#000', shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5}}>
                        <Text style={{marginBottom: 15, textAlign: 'center', color: colors.mainColor, fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase',}}>Add product</Text>
                        <View style={{marginBottom: 20}}>
                            <View style={{marginBottom: 10}}>
                                <Text style={{marginBottom: 6}}>Name</Text>
                                <TextInput placeholder="Enter product's name" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) =>  setProductNameAdd(text)} value={productNameAdd}/>
                            </View>
                            <View style={{marginBottom: 10}}>
                                <Text style={{marginBottom: 6}}>Price</Text>
                                <TextInput placeholder="Enter product's price" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) => setProductPriceAdd(text)} value={productPriceAdd}/>
                            </View>
                            <View style={{marginBottom: 10}}>
                                <Text style={{marginBottom: 6}}>Quantity</Text>
                                <TextInput placeholder="Enter product's quantity" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) => setProductQuantityAdd(text)} value={productQuantityAdd}/>
                            </View>
                            <View style={{marginBottom: 10}}>
                                <Text style={{fontSize: 14, color: '#636363', marginBottom: 4}}>Status</Text>
                                <SelectList 
                                    data={statusArr}
                                    setSelected={(key) => onSelected(key, 'status')}
                                    placeholder="Select product's status"
                                />
                            </View>
                            <View style={{marginBottom: 10}}>
                                <Text style={{fontSize: 14, color: '#636363', marginBottom: 4}}>Type</Text>
                                <SelectList 
                                    data={setValueTypeArr}
                                    setSelected={(key) => onSelected(key, 'type')}
                                    placeholder="Select product's type"
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
                            style={styles.buttonClose}
                            onPress={onAddProduct}>
                            <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Add</Text>
                        </Pressable>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Close</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 22,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: 500
    },
    modalView: {
      width: '90%',
      overflow: 'scroll',
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height: 100
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: colors.mainColor,
      marginBottom: 20,
      paddingVertical: 14,
      borderRadius: 20,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: colors.mainColor,
      fontSize: 20,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
});

export default ManageProduct;