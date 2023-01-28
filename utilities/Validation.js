const isValidEmail = (emailStr) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailStr))
const isValidPassword = (passwordStr) => passwordStr.length > 5
const isValidPhoneNumber = (phoneNumber) => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(phoneNumber.match(phoneno)) {
        return true;
    }
    else {
        return false;
    }
}
const isValidFullName = (fullNameStr) => fullNameStr.length > 8

export default {
    isValidEmail,
    isValidPassword,
    isValidPhoneNumber,
    isValidFullName
}
    
