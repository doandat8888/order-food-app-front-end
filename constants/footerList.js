import { images } from ".";

const footerList = () => {
    return (
        [
            {
                name: 'Home',
                img: images.homeIcon,
                isSelected: true,
            },
            {
                name: 'Foods',
                img: images.foodsIcon,
                isSelected: false,
            },
            {
                name: 'Settings',
                img: images.settingIcon,
                isSelected: false,
            },
            {
                name: 'Notifications',
                img: images.bellIcon,
                isSelected: false,
            },
            {
                name: 'Me',
                img: images.userIcon,
                isSelected: false,
            },
        ]
    )
}

export default footerList;