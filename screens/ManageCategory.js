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
import CategoryAdminItem from "../components/CategoryAdminItem";
import { useNavigation } from "@react-navigation/native";

const ManageProductCategory = (props) => {
    const navigation = useNavigation();
    const [user, setUser] = useState({});
    const [categoryNameTxt, setCategoryNameTxt] = useState('');
    const [types, setTypes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryNameAdd, setCategoryNameAdd] = useState('');
    const [categoryImgAdd, setCategoryImgAdd] = useState('');
    const {idUser} = props;

    useEffect(() => {
        getUserInfo();
        getAllType();
    }, [])

    const getUserInfo = async() => {
        let response = await axios.get(`http://192.168.1.187:3000/api/v1/get-user-by-id?id=${idUser}`);
        if(response && response.data.errCode === 0) {
            setUser(response.data.data);
        }
    }

    const filterCategory = () => {
        return types && types.length > 0 ? types.filter(type => type.name.toLowerCase().includes(categoryNameTxt.toLowerCase())) : types;
    }

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

    const onAddCategory = async() => {
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
            if(categoryMatch && categoryMatch.name !== '') {
                alert('Product has existed. Please try again')
            }else {
                let response = await axios.post('http://192.168.1.187:3000/api/v1/add-new-category', {
                    id: types.length + 1,
                    name: categoryNameAdd,
                    img: categoryImgAdd,
                    status: 1,
                });
                if(response && response.data && response.data.errCode === 0) {
                    alert("Add new category successfully");
                    setModalVisible(!modalVisible);
                    setCategoryNameAdd('');
                    setCategoryImgAdd('');
                    getAllType();
                }else {
                    alert("Add new category failed");
                }
            }
        }
    }

    const onEditCategory = (idCategory) => {
        props.onEditCategory(idCategory);
    }

    const onDeleteCategory = async(idProduct) => {
        let response = await axios.put('http://192.168.1.187:3000/api/v1/delete-category', {
            id: idProduct,
            status: 0,
        });
        if(response && response.data && response.data.errCode === 0) {
            alert("Delete category successfully");
            getAllType();
        }else {
            alert("Delete category failed");
        }
    }

    return (
        <ScrollView style={{flex: 1}}>
            <HeaderSub iconLeft={images.arrowLeft} title={'Manage Category'} onNavigate={() => navigation.navigate('Login')}/>
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
                            onChangeText={(text) => setCategoryNameTxt(text)}
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
                    {filterCategory() && filterCategory().length > 0 ? filterCategory().map((item, index) => item.status === 1 ? <CategoryAdminItem id={item.id} key={index} index={index} image={item.img} name={item.name} onEditCategory={() => onEditCategory(item.id)} onDeleteCategory={() => onDeleteCategory(item.id)} /> : '') : ''}
               </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                setCategoryNameAdd('');
                setCategoryImgAdd('');
                }}>
                <ScrollView contentContainerStyle={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <View style={{width: '90%', margin: 20,backgroundColor: 'white', borderRadius: 20, paddingVertical: 20, paddingHorizontal: 30, shadowColor: '#000', shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5}}>
                        <Text style={{marginBottom: 15, textAlign: 'center', color: colors.mainColor, fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase',}}>Add category</Text>
                        <View style={{marginBottom: 20}}>
                            <View style={{marginBottom: 10}}>
                                <Text style={{marginBottom: 6}}>Name</Text>
                                <TextInput placeholder="Enter category's name" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) => setCategoryNameAdd(text)} value={categoryNameAdd}/>
                            </View>
                            <View style={{marginBottom: 10}}>
                                <Text style={{marginBottom: 6}}>Image</Text>
                                <TextInput placeholder="Enter category's image URL" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) => setCategoryImgAdd(text)} value={categoryImgAdd}/>
                            </View>
                        </View>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={onAddCategory}>
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

export default ManageProductCategory;