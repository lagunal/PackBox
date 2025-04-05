const mongoose = require('mongoose');

const schemaUsers = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Required field']
    },
    emailId: {
        type: String,
        unique: true,
        required: [true, 'Required field']
    },
    password: {
        type: String,
        required: [true, 'Required true']
    },
    phoneNo: {
        type: Number,
    },
    bookings: {
        shiftFrom: { type: String },
        shiftTo: { type: String },
        shiftType: { type: String }
    }
},
{
    timestaps: {
        createdAt: true,
        updatedAt: true
    }
}
);

const userModel = mongoose.model("Users", schemaUsers);

module.exports = userModel;

