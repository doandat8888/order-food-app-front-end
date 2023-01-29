import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import { connect, useSelector } from "react-redux";
import { HeaderSub } from "../components";
import ButtonMain from "../components/ButtonMain";
import ButtonSub from "../components/ButtonSub";
import CartItem from "../components/CartItem";
import CartList from "../components/CartList";
import { colors, images } from "../constants";
import cartItems from "../reducers/cartItems";

const Checkout = (props) => {
    const data = useSelector(item => item.cartItems.value);
    const [totalMoney, setTotalMoney] = useState(0);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [shippingFee, setShippingFee] = useState(2);
    const [orderList, setOrderList] = useState([]);
    //const [idOrder, setIdOrder] = useState(0);

    const getAllOrder = async() => {
        let response = await axios.get('http://192.168.1.187:3000/api/v1/get-all-order');
        if(response && response.data && response.data.errCode === 0) {
            setOrderList(response.data.data);
        }
    }

    const onCheckout = async() => {
        let count = 0;
        let infoArr = [fullName, phoneNumber, address];
        for(let i = 0; i < infoArr.length; i++) {
            if(infoArr[i] === '') {
                count++;
            }
        }
        if(count > 0) {
            alert('Missing order information. Please try again')
        }else {
            let idOrder = orderList.length + 1;
            if(totalMoney <= 0) {
                alert('No food in your cart. Please try again')
            }else {
                let response = await axios.post('http://192.168.1.187:3000/api/v1/add-new-order', {
                    id: idOrder,
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    address: address,
                    total: totalMoney + shippingFee
                });
                if(response && response.data && response.data.errCode === 0) {
                    alert('Add new order successfully')
                    let countDetailOrder = 0;
                    let countFood = 0;
                    for(let i = 0; i < data.length; i++) {
                        let idProduct = data[i].foodInfo.id;
                        let responseDetailFood = await axios.get(`http://192.168.1.187:3000/api/v1/get-detail-food?id=${idProduct}`);
                        if(responseDetailFood && responseDetailFood.data.errCode === 0) {
                            let productCheckout = responseDetailFood.data.data;
                            let responseUpdateFood = await axios.put('http://192.168.1.187:3000/api/v1/update-food', {
                                id: productCheckout.id,
                                name: productCheckout.name,
                                price: productCheckout.price,
                                quantity: productCheckout.quantity - data[i].quantity,
                                status: productCheckout.status,
                                type: productCheckout.type,
                                img: productCheckout.img,
                                socials: productCheckout.socials,
                                description: productCheckout.description,
                                statusFood: 1
                            });
                            if(responseUpdateFood && responseUpdateFood.data.errCode === 0) {
                                countFood++;
                            }
                        }
                        let response = await axios.post('http://192.168.1.187:3000/api/v1/add-new-detail-order', {
                            idOrder: idOrder,
                            foodName: data[i].foodInfo.name,
                            foodType: data[i].foodInfo.type,
                            foodPrice: data[i].foodInfo.price,
                            foodQuantity: data[i].quantity,
                            total: data[i].foodInfo.price * data[i].quantity,
                        });
                        if(response && response.data && response.data.errCode === 0) {
                            countDetailOrder++;
                        }
                    }
                    if(countFood === data.length) {
                        alert('Update product info successfully')
                    }
                    if(countDetailOrder === data.length) {
                        alert('Add new detail order successfully')
                    }
                }
            }
            
            
        }
    }

    useEffect(() => {
        // const carts = props.cartItems;
        // setCartFoods(carts)
        setTotalMoney(data.reduce((accumulator, item) => accumulator + (item.quantity * item.foodInfo.price), 0));
        getAllOrder();
    }, [])
    return (
        <ScrollView style={{paddingVertical: 20, flex: 1}}>
            <HeaderSub iconLeft={images.arrowLeft} title={'Check out'} onNavigate={() => props.navigation.navigate('Cart')}/>
            <View style={{ padding: 20}}>
                <Text style={{fontSize: 16, color: colors.mainColor, marginBottom: 20, fontWeight: 'bold'}}>Recipient's info</Text>
                <View style={{marginBottom: 10}}>
                    <Text style={{marginBottom: 6}}>Name</Text>
                    <TextInput placeholder="Enter the recipient's name" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) =>  setFullName(text)} value={fullName}/>
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{marginBottom: 6}}>Phone number</Text>
                    <TextInput placeholder="Enter the recipient's phone number" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) => setPhoneNumber(text)} value={phoneNumber}/>
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{marginBottom: 6}}>Address</Text>
                    <TextInput placeholder="Enter the recipient's address" style={{borderWidth: 0.5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}} onChangeText={(text) => setAddress(text)} value={address}/>
                </View>
            </View>
            <View style={{marginHorizontal: 20}}>
                <Text style={{fontSize: 16, color: colors.mainColor, marginBottom: 20, fontWeight: 'bold'}}>Your cart</Text>
                <CartList data={data}/>
            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 20}}>
                <Text style={{fontSize: 16, color: colors.mainColor, marginBottom: 20, fontWeight: 'bold'}}>Order info</Text>
                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#636363'}}>
                        <Text style={{color: '#636363'}}>Subtotal</Text>
                        <Text style={{color: colors.mainColor}}>${totalMoney}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#636363'}}>
                        <Text style={{color: '#636363'}}>Shipping Fee</Text>
                        <Text style={{color: colors.mainColor}}>${shippingFee}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#636363'}}>
                        <Text style={{color: '#636363', fontWeight: 'bold'}}>Total</Text>
                        <Text style={{color: colors.mainColor, fontWeight: 'bold'}}>${totalMoney + shippingFee}</Text>
                    </View>
                    <View style={{marginVertical: 20}}>
                        <View style={{marginVertical: 20}}>
                            <ButtonMain title={'CHECK OUT'} onPress={onCheckout}/>
                        </View>
                        <View>
                            <ButtonSub title={'BACK'} onPress={() => props.navigation.navigate('Cart')}/>
                        </View>
                    </View>
                </View>
            </View>
            
        </ScrollView>
    )
}


export default Checkout;