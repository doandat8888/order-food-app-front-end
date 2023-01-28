import {Text, View, Image, ImageBackground, TouchableOpacity, TextInput} from 'react-native';
import {colors, images, fontSizes} from '../constants/index';
const HeaderSub = (props) => {
    const {title, iconLeft} = props;
    const onNavigate = () => {
        props.onNavigate();
    }
    return (
        <View
            style={{
                height: 80,
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: colors.gray,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {iconLeft ? 
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        left: 0,
                    }}
                    onPress={onNavigate}
                >
                    <Image 
                        source={iconLeft}
                        style={{
                            width: 30,
                            height: 30,
                            marginLeft: 20,
                            tintColor: colors.mainColor,
                        }}
                    />
                </TouchableOpacity>
            : ''}
            
            
            
            <Text
                style={{
                    fontSize: fontSizes.h3,
                    color: colors.mainColor,
                }}
            >{title}</Text>
        </View>
    )
}

export default HeaderSub;