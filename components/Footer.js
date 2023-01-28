import { Link } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import footerList from "../constants/footerList";
import FoodItem from "./FoodItem";
import FooterItem from "./FooterItem";

const Footer = (props) => {

    const [footers, setFooters] = useState(footerList);

    const onPressFooterItem = (footerItem) => {
        let newFooterItem = footers.map(eachFooter => {
            return {
                ...eachFooter,
                isSelected: eachFooter.name === footerItem.name,
            }
        })
        setFooters(newFooterItem);
    }

    return (
        <View
            style={{
                height: 60,
                backgroundColor: 'white',
                flexDirection: 'row',
                paddingHorizontal: 20,
                justifyContent:'space-between',
                alignItems: 'center',
            }}
        >
            {footers.map((footer, index) => {
                return (
                    <Link to={footer.name}>
                        <FooterItem key={index} name={footer.name} source={footer.img} onPress={() => onPressFooterItem(footer)} isSelected={footer.isSelected}/>
                    </Link>
                    
                )
            })}
        </View>
        
    )
}

export default Footer;