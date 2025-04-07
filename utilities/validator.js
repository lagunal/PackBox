const userModel = require('../models/user');


exports.validatePassword = (password) => {
    var validation = true;

    const specialCharacters = /[!@#$%^&*(),./;{}<>]/;
    const numberPatter = /[0-9]/;
    const lowerCase = /[a-z]/;
    const upperCase = /[A-Z]/;
    
    if (password.trim().length < 8) {
        validation = false;
    } else if (!specialCharacters.test(password) || !numberPatter.test(password) || !lowerCase.test(password) || !upperCase.test(password)) {
        validation = false;
    }
    if (validation) {
        return true;
    } else {
        let err = new Error("Password is invalid");
        err.status = 400;
        throw err;
    }
};

exports.validatePhoneNo = (phoneNo) => {
    if (phoneNo.toString().length == 10) {
        return true;
    } else {
        let err = new Error("Phone number is invalid");
        err.status = 400;
        throw err;
    }
};


exports.validateEmail = (email) => {
    const phoneCharacters = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneCharacters.test(email)) {
        let err = new Error("Email Id is invalid");
        err.status = 400;
        throw err;
    }
    return true;
};

exports.validateName = (name) => {
    if (name.trim().length < 5) {
        let err = new Error("Name is invalid");
        err.status = 400;
        throw err;
    }
    return true;
};


exports.validateExistingEmail = async (email) => {
    const emailFound = await userModel.find({ emailId: email });

    if (emailFound.length > 0) {
        let err = new Error("User already exists");
        err.status = 400;
        throw err;
    }
    return true;
};

exports.validateShiftType = (shift) => {
    if (shift.toLowerCase() != 'house' || shift.toLowerCase() != 'vehicle') {
        let err = new Error("Shift type is invalid");
        err.status = 400;
        throw err;
    }
    return true;
};








