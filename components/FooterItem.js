import { Image, View, Text, TouchableOpacity } from "react-native"
import { colors } from "../constants";
import footerList from "../constants/footerList";

const FooterItem = (props) => {

    return (
        <TouchableOpacity
            onPress={props.onPress}
        >
            <Image source={props.source} style={{width: 20, height: 20, marginLeft: 'auto', marginRight: 'auto', tintColor: props.tintColor === true ? colors.mainColor : 'black'}}/>
            <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontSize: 12, color: props.color}}>{props.name}</Text>
        </TouchableOpacity>
        
    )
}

export default FooterItem