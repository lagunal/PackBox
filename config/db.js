const mongoose = require('mongoose');

exports.connectDB = async () => {
    mongoose.connect('mongodb://localhost:27017/PackBox')
    .then( () => {
        console.log("DB connection successful...")
    })
};





