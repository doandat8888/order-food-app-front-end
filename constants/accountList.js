import { colors, images } from ".";

const accountList = () => {
    return [
        {
            id: 1,
            email: 'david@gmail.com',
            password: 'david123456',
            name: 'David',
            img: images.userDavid,
            gender: 1,
            phoneNumber: '0922555899',
            type: 1,
        },
        {
            id: 2,
            email: 'emma@gmail.com',
            password: 'emma123',
            name: 'Emma',
            img: images.userEmma,
            gender: 0,
            phoneNumber: '0933255888',
            type: 0,
        }
    ]
}

export default accountList;