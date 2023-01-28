import { useEffect, useState } from "react"
import { ScrollView, View, Text, Image, Dimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { colors, images } from ".";


const bestSelllerList = () => {
    return [
        {
            id: 1,
            name: 'Pizza Itylia L',
            price: 10, //$
            status: 'Coming soon',
            type: 'Pizza',
            img: images.pizzaItalia,
            socials: ['Facebook', 'Instagram', 'Twitter']
        },
        {
            id: 2,
            name: 'BBQ Italia Medium',
            price: 12, //$
            status: 'Opening now',
            type: 'BBQ',
            img: images.bbqItalya,
            socials: ['Facebook', 'Instagram', 'Twitter']
        },
        {
            id: 3,
            name: 'Pizza France L',
            price: 9,
            status: 'Opening now',
            type: 'Pizza',
            img: images.pizzaFrance,
            socials: ['Facebook', 'Twitter']
        },
        {
            id: 4,
            name: 'Hamburger France KFC M',
            price: 6,
            status: 'Coming soon',
            type: 'Hamburger',
            img: images.hamburgerFrance,
            socials: ['Facebook', 'Instagram']
        },
        {
            id: 5,
            name: 'Italy Pasta LoliPop X',
            price: 10,
            status: 'Closing soon',
            type: 'Pasta',
            img: images.pastaItaly,
            socials: ['Facebook']
        },
        {
            id: 6,
            name: 'Fried chicken America L',
            price: 5,
            status: 'Coming soon',
            type: 'Fried Chicken',
            img: images.friedChickenAmerica,
            socials: ['Facebook', 'Twitter']
        },
        {
            id: 7,
            name: 'Fried Potato Italia M',
            price: 3, //$
            status: 'Closing soon',
            type: 'Fried Potato',
            img: images.friedPotatoItalia,
            socials: ['Facebook', 'Instagram', 'Twitter']
        },
        {
            id: 8,
            name: 'Pepsi Medium',
            price: 1.5, //$
            status: 'Opening now',
            type: 'Beverage',
            img: images.pepsiMedium,
            socials: ['Facebook', 'Instagram']
        },
        {
            id: 9,
            name: 'Cocacola Medium',
            price: 1.5, //$
            status: 'Opening now',
            type: 'Beverage',
            img: images.cocacolaMedium,
            socials: ['Facebook', 'Instagram']
        },
        {
            id: 10,
            name: 'Hot dog America S',
            price: 5, //$
            status: 'Opening now',
            type: 'Hotdog',
            img: images.hotdogAmerica,
            socials: ['Facebook', 'Instagram']
        },
        {
            id: 11,
            name: 'Hot dog Italya M',
            price: 4, //$
            status: 'Closing soon',
            type: 'Hotdog',
            img: images.hotdogItalya,
            socials: ['Facebook', 'Instagram']
        },
    ]
}

export default bestSelllerList;