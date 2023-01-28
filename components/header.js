import { images, colors } from "../constants";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

const Header = (props) => {
    let {onchangeInput, iconRight, onPressIconRight} = props;
    return (
        <View
            style={{
                height: 100,
                backgroundColor: colors.mainColor,
                flexDirection: 'row',
                paddingHorizontal: 20,
            }}
        >
            
            <TextInput
                style={{
                    width: 320,
                    height: 40,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    zIndex: 1,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'transparent',
                    marginTop: 40
                }}
                placeholder='Search'
                onChangeText={onchangeInput}
            > 
            </TextInput>
            <View 
                style={{position: 'absolute', zIndex: 20, left: 310, marginTop: 50}}>
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

            
            <TouchableOpacity style={{width: 20, height: 20, marginTop: 50}} onPress={onPressIconRight}>
                <Image
                    source={iconRight}
                    style={{
                        width: 24,
                        height: 24,
                        marginLeft: 20
                    }}
                >
                </Image>
            </TouchableOpacity>
        </View>
    )
}

export default Header;