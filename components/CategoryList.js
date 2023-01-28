import { useState, useEffect } from "react"
import { ScrollView, View, Text, Image, Dimensions } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { colors, images } from "../constants";
import CategoryItem from "./CategoryItem";
import { FlatList } from "react-native-gesture-handler";
import categories from "../constants/categories";
import axios from "axios";
const {width} = Dimensions.get("window");

const CategoryList = (props) => {

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);

    const getAllType = async() => {
        try {
            let categories = [];
            categories.push({
                id: 0,
                name: '',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Republic_Of_Korea_Broadcasting-TV_Rating_System%28ALL%29.svg/1200px-Republic_Of_Korea_Broadcasting-TV_Rating_System%28ALL%29.svg.png',
                status: 1,
            })
            let response = await axios.get('http://192.168.1.187:3000/api/v1/get-all-type');
            if(response && response.data.errCode === 0) {
                let categoriesNew = response.data.data;
                for(let i = 0; i < categoriesNew.length; i++) {
                    categories.push(categoriesNew[i]);
                }
                setTypes(categories);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllType();
    }, [])

    const [screenWidth, setScreenWidth] = useState(0)

    const onContentSizeChange = (contentWidth, contentHeight) => {
        setScreenWidth(contentWidth)
    }

    const onPress = (categoryName) => {
        props.onPress(categoryName, props.type);
    }

    const scrollEnabled = screenWidth > width;

    return (
        <FlatList
            style={{ 
                flex: 1,
                marginHorizontal: 14,
                flexDirection: 'row',
            }}
            horizontal={true}
            data={types}
            keyExtractor={category => category.name}
            renderItem={category => {
                return category.item.status === 1 ?  <CategoryItem categoryName={category.item.name} source={category.item.img} onPress={() => onPress(category.item.name)}></CategoryItem> : ''
            }}
        >
        </FlatList>
    )
}

export default CategoryList