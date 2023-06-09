const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    role: {
        type: Number,
        required: true,
    },
    details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserDetail",
    },
    status: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('User', userSchema);