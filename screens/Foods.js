import { useEffect, useState } from "react"
import { ScrollView, View, Text, Image, Dimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { colors, images } from "../constants";
import CategoryList from "../components/CategoryList";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
const {height} = Dimensions.get("window");
import {foodList} from "../constants";
import socialIconList from "../constants/socialIcons";
import FoodItem from "../components/FoodItem";
import Header from "../components/header";
import axios from "axios";

const Foods = (props) => {

    const [keyword, setKeyword] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('name');
    const [foodArr, setFoodArr] = useState([]);

    const onClickIcon = (name) => {
        alert(`${name} icon`);
    }

    const onChangeInputSearch = (keyword) => {
        setTypeFilter('name');
        setKeyword(keyword);
    }   

    const [screenHeight, setScreenHeight] = useState(0)

    const onContentSizeChange = (contentWidth, contentHeight) => {
        setScreenHeight(contentHeight)
    }

    const filterFoods = () => {
        if(typeFilter === 'name') {
            return foods && foods.length > 0 ? foods.filter(food => food.name.toLowerCase().includes(keyword.toLowerCase())) : foods
        }else if(typeFilter === 'category') {
            return foods && foods.length > 0 ? foods.filter(food => food.type.toLowerCase().includes(categoryFilter.toLowerCase())) : foods
        }
    }

    const onPressCategoryItem = (categoryName, type) => {
        if(type === 'filter') {
            setTypeFilter('category');
            setCategoryFilter(categoryName);
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

    const scrollEnabled = screenHeight > height;

    const [foods, setFoods] = useState([]);

    const [socialIcons, setSocialIcons] = useState(socialIconList);


    
    

    const onPressSearchIcon = () => {
        setTypeFilter('name');
        filterFoods();
    }

    const viewDetailProduct = (idProduct) => {
        props.navigation.navigate('DetailProduct', {id: idProduct});
    }

    useEffect(() => {
        getAllFood();
    }, [])

    

    return (
        <View
            style={{ flex: 1 }}
        >
                <Header onchangeInput={onChangeInputSearch} iconRight={images.listIcon}/>
                <View
                    style={{
                        marginTop: 20,
                        height: 80,
                        borderBottomColor: colors.gray,
                        borderBottomWidth: 1,
                        marginBottom: 20
                    }}
                >
                    <CategoryList onPress={onPressCategoryItem} type={'filter'}></CategoryList>
                </View>
                {filterFoods().length > 0 ? <FlatList
                    data={filterFoods()}
                    renderItem={({item}) => item.statusFood === 1 ? <FoodItem 
                        onPress={() => viewDetailProduct(item.id)}
                        food={item} socialIcons={socialIcons}
                        key={item.name}
                    /> : ''}
                    keyExtractor={eachFood => eachFood.name}
                /> : <Text style={{marginLeft: 'auto', marginRight: 'auto', color: colors.mainColor}}>No foods found</Text>}
                
        </View>
        
    )
    
}

export default Foods