const User = require('./user.mongo');
const axios = require('axios');

async function getByPhone(phone) {
    return await User.findOne({ phone });
}

async function customerRegister(req) {
    const { name, phone, email, address } = req.body;
    const customerObj = {
        name: name,
        phone: phone,
        email: email,
        address: address,
        role: 2,
    }

    try {
        return await User.create(customerObj);
    } catch (error) {
        console.log(err);
    }
}

module.exports = {
    customerRegister,
    getByPhone
}
