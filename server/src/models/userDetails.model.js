const mongoose = require('mongoose');

const userDetailSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    licenseNumber: {
        type: String,
        required: true,
    },
    licensePicFront: {
        type: String,
        required: true,
    },
    licensePicBack: {
        type: String,
        required: true,
    },
    nidPicFront: {
        type: String,
        required: true,
    },
    nidPicBack: {
        type: String,
        required: true,
    },
    vehiclePic1: {
        type: String,
        required: true,
    },
    vehiclePic2: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('UserDetail', userDetailSchema);