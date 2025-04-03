const userModel = require('../models/user');

const validator = require('../utilities/validator');

exports.registerUser = async (req, res, next) => {
    
    const { name, emailId, password, phoneNo } = req.body;

    try {
        //validations
        validator.validatePassword(password);
        validator.validatePhoneNo(phoneNo);
        validator.validateEmail(emailId);
        validator.validateName(name);
        await validator.validateExistingEmail(emailId);
        

        //promise
        userModel.create({
            name: name,
            emailId: emailId,
            password: password,
            phoneNo: phoneNo,    
        })
        .then((result) => {
            res.status(201).json({
                message: `User registered successfully with name: ${result.name}`
            })
        })
        .catch(err => {
            err.message = "Registration failed..."
            err.status = 500
            next(err)
        })
    } catch(err) {
        next(err)
    }
    


};




