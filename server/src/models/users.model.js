const User = require('./user.mongo');
const bcrypt = require("bcrypt");

async function getByPhone(phone) {
    return await User.findOne({ phone });
}

async function customerRegister(req) {
    const { name, phone, email, address, password } = req.body;
    const hashedPwd = await bcrypt.hash(password, 10);
    const customerObj = {
        name: name,
        phone: phone,
        email: email,
        address: address,
        role: 2,
        password: hashedPwd,
    }

    try {
        return await User.create(customerObj);
    } catch (error) {
        console.log(err);
    }
}

async function login(user, password) {
    const { password: userPassword } = user;
    return await bcrypt.compare(password, userPassword);
}

module.exports = {
    customerRegister,
    getByPhone,
    login
}
