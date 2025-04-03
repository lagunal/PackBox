const mongoose = require('mongoose');

const schemaPackages = new mongoose.Schema({
    shiftType: {
        type: String,
        required: [true, 'Required Field']
    },
    description: {
        type: String,
        required: [true, 'Required Field']
    }

},
{
    timestamps: {
        createdAt: true,
        updatedAt: true,
    },
});

const packageModel = mongoose.model("Packages", schemaPackages);


module.exports = packageModel;

