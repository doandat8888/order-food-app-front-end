import { Text, Image, View, Button, TouchableOpacity} from "react-native";
import { colors, images } from "../constants";

const ButtonMain = (props) => {
    const {title} = props;
    const onPressBtn = () => {
        props.onPress();
    }
    return (
        <TouchableOpacity onPress={onPressBtn} style={{paddingVertical: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.mainColor, borderRadius: 20}}>
            <Text style={{color: '#FFFFFF'}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonMain;