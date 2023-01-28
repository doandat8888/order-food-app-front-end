import { Text, Image, View, Button, TouchableOpacity} from "react-native";
import { colors, images } from "../constants";

const ButtonSub = (props) => {
    const {title} = props;
    const onPressBtn = () => {
        props.onPress();
    }
    return (
        <TouchableOpacity onPress={onPressBtn} style={{paddingVertical: 16, justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth: 1, borderColor: colors.mainColor}}>
            <Text style={{color: colors.mainColor}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonSub;