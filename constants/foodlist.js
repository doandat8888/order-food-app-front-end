import { useEffect, useState } from "react"
import { ScrollView, View, Text, Image, Dimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { colors, images } from ".";


const foodList = () => {
    return [
        {
            id: 1,
            name: 'Pizza Itylia L',
            price: 10, //$
            status: 'Coming soon',
            type: 'Pizza',
            img: images.pizzaItalia,
            socials: ['Facebook', 'Instagram', 'Twitter'],
            description: 'Pizza Itylia L is very popular recently'
        },
        {
            id: 2,
            name: 'BBQ Italia Medium',
            price: 12, //$
            status: 'Opening now',
            type: 'BBQ',
            img: images.bbqItalya,
            socials: ['Facebook', 'Instagram', 'Twitter'],
            description: 'BBQ Italia Medium is very popular recently'
        },
        {
            id: 3,
            name: 'Pizza France L',
            price: 9,
            status: 'Opening now',
            type: 'Pizza',
            img: images.pizzaFrance,
            socials: ['Facebook', 'Twitter'],
            description: 'Pizza France L is very popular recently'
        },
        {
            id: 4,
            name: 'Hamburger France KFC M',
            price: 6,
            status: 'Coming soon',
            type: 'Hamburger',
            img: images.hamburgerFrance,
            socials: ['Facebook', 'Instagram'],
            description: 'Hamburger France KFC M is very popular recently'
        },
        {
            id: 5,
            name: 'Italy Pasta LoliPop X',
            price: 10,
            status: 'Closing soon',
            type: 'Pasta',
            img: images.pastaItaly,
            socials: ['Facebook'],
            description: 'Italy Pasta LoliPop X is very popular recently'
        },
        {
            id: 6,
            name: 'Fried chicken America L',
            price: 5,
            status: 'Coming soon',
            type: 'Fried Chicken',
            img: images.friedChickenAmerica,
            socials: ['Facebook', 'Twitter'],
            description: 'Fried chicken America L is very popular recently'
        },
        {
            id: 7,
            name: 'Fried Potato Italia M',
            price: 3, //$
            status: 'Closing soon',
            type: 'Fried Potato',
            img: images.friedPotatoItalia,
            socials: ['Facebook', 'Instagram', 'Twitter'],
            description: 'Fried Potato Italia M is very popular recently'
        },
        {
            id: 8,
            name: 'Pepsi Medium',
            price: 1.5, //$
            status: 'Opening now',
            type: 'Beverage',
            img: images.pepsiMedium,
            socials: ['Facebook', 'Instagram'],
            description: 'Pepsi Medium is very popular recently'
        },
        {
            id: 9,
            name: 'Cocacola Medium',
            price: 1.5, //$
            status: 'Opening now',
            type: 'Beverage',
            img: images.cocacolaMedium,
            socials: ['Facebook', 'Instagram'],
            description: 'Cocacola Medium is very popular recently'
        },
        {
            id: 10,
            name: 'Hot dog America S',
            price: 5, //$
            status: 'Opening now',
            type: 'Hotdog',
            img: images.hotdogAmerica,
            socials: ['Facebook', 'Instagram'],
            description: 'Hot dog America S is very popular recently'
        },
        {
            id: 11,
            name: 'Hot dog Italya M',
            price: 4, //$
            status: 'Closing soon',
            type: 'Hotdog',
            img: images.hotdogItalya,
            socials: ['Facebook', 'Instagram'],
            description: 'Hot dog Italya M is very popular recently'
        },
    ]
}

export default foodList;