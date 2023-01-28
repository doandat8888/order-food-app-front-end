import { colors, images } from ".";

const categories = () => {
    return [
        {
            name: '',
            source: images.allImg,
            text: 'All'
        },
        {
            name: 'BBQ',
            source: images.bbqCategory,
            text: 'BBQ'
        },
        {
            name: 'Pizza',
            source: images.pizzaItalia,
            text: 'Pizza'
        },
        {
            name: 'Hamburger',
            source: images.hamburgerFrance,
            text: 'Hamburger'
        },
        {
            name: 'Pasta',
            source: images.pastaItaly,
            text: 'Pasta'
        },
        {
            name: 'Fried Chicken',
            source: images.friedChickenAmerica,
            text: 'Fried Chicken'
        },
        {
            name: 'Fried Potato',
            source: images.friedPotatoItalia,
            text: 'Fried Potato'
        },
        {
            name: 'Beverage',
            source: images.beverageCategory,
            text: 'Beverage'
        },
        {
            name: 'Hotdog',
            source: images.hotdogCategory,
            text: 'Hotdog'
        },
    ]
}

export default categories