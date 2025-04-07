const userModel = require('../models/user');
const packageModel = require('../models/package');


const validator = require('../utilities/validator');
const encrypt = require('../utilities/encrypt');


const registerUser = async (req, res, next) => {
    
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
            password: encrypt.encrypt(password),
            phoneNo: phoneNo,
            bookings: {
                shiftFrom: "",
                shiftTo: "",
                shiftType: ""
            } 
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

const loginUser = async (req, res, next) => {
    const { emailId, password } = req.body;
    
    try {
        const userLogged = await userModel.find({ emailId: emailId })
    
        if (userLogged.length == 0) {
            return res.status(400).json({
                message: "Incorrect user Id or password"
            })
        }

        const isPwdMatch = await encrypt.compare(password, userLogged[0].password);
        if (!isPwdMatch) {
            return res.status(400).json({
                message: "Incorrect user Id or password"
            })
        }

        res.status(200).json({
            message: "User logged successfully"
        })

    } catch(err) {
        next(err);
    }
};

const getPackages = async (req, res, next) => {
    
    try {
        const packages = await packageModel.find();

        if  (packages.length > 0) {
            return res.status(200).json({
                packages
            })
        } else {
            return res.status(400).json({
                message: "No packages results"
            })
        }

    } catch(err) {
        next(err);
    }
    

};


const bookSlot = async (req, res, next) => {
    
    const emailId = req.body.emailId;
    const { shiftFrom, shiftTo, shiftType } = req.body.bookings;
    
    try {
        //validations
        validator.validateShiftType(shiftType);
        
        const filter = { emailId: emailId };
        const update = {
            $set: {
                bookings: {
                    shiftFrom: shiftFrom,
                    shiftTo: shiftTo,
                    shiftType: shiftType
                }
            }
        };
        
        await userModel.updateOne(filter, update)
            .then((result) => {
                if (result.matchedCount === 0) {
                    return res.status(404).json({
                        message: "User not found"
                    });
                }
                res.status(200).json({
                    message: "Booking successful"
                });
            })
            .catch(err => {
                err.message = "Booking failed";
                err.status = 400;
                next(err);
            });

    } catch(err) {
        next(err);
    }


};

const cancelBooking = async (req, res, next) => {
    
    const emailId = req.params.emailId;

    try {
        const filter = { emailId: emailId };
        const update = {
            $unset: {
                bookings: ""
            }
        }

        const result = await userModel.findOneAndUpdate(filter, update, { new: true });
        if (!result) {
            res.status(400).json({
                message: "user email does not exist"
            })
        }
        res.status(200).json({
            message: "Cancellation successful"
        });
        
    } catch(err) {
        next(err)
    }


};


const deleteUser = async (req, res, next) => {
    const emailId = req.params.emailId;

    try {
        const filter = { emailId: emailId };
        userModel.deleteOne(filter)
            .then(result => {
                if (result.matchedCount === 0) {
                    return res.status(404).json({
                        message: "User not found"
                    });
                }
                res.status(200).json({
                    message: "User is removed"
                });
            })
            .catch(err => {
                err.message = "Removing user failed";
                err.status = 400;
                next(err);
            })
    } catch(err) {
        next(err)
    }

};

module.exports = {
    registerUser,
    loginUser,
    getPackages,
    bookSlot,
    cancelBooking,
    deleteUser
};