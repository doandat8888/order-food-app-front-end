import { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Image, Dimensions, Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, images } from "../constants";

const CategoryAdminItem = (props) => {
    let {id, index, image, name} = props;
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, backgroundColor: index % 2 == 0 ? 'white' : 'gainbostro'}}>
            <Text style={{width: '8%', color: colors.mainColor}}>{id}</Text>
            <Image
                source={{uri: image ? image: ''}}
                style={{width: '16%', height: 60, borderRadius: 8}}
            />
            <Text numberOfLines={1} ellipsizeMode="tail" style={{paddingHorizontal: 10, marginHorizontal: 10, width: '48%', paddingLeft: 8}}>{name}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '20%'}}>
                <TouchableOpacity style={{backgroundColor: colors.mainColor, alignItems: 'center', justifyContent: 'center', padding: 8, marginRight: 8}} onPress={() => props.onEditCategory()}>
                    <Image source={images.editIcon} style={{width: 20, height: 20, tintColor: 'white'}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#C7C7CB', padding: 8}} onPress={() => props.onDeleteCategory()}>
                    <Image source={images.trashIcon} style={{width: 20, height: 20}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CategoryAdminItem;