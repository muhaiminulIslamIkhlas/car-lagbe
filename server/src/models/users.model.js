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
        status: 1,
        password: hashedPwd,
    }

    try {
        return await User.create(customerObj);
    } catch (error) {
        console.log(error);
    }
}

async function login(user, password) {
    const { password: userPassword } = user;
    return await bcrypt.compare(password, userPassword);
}

async function getAllUsers() {
    return await User.find({}, {
        '_id': 0, '__v': 0, 'password': 0
    });
}

async function loadUser() {
    const hashedPwd = await bcrypt.hash('Carlagbe123!@#', 10);
    const admin = {
        name: 'Arefin',
        phone: '01684720356',
        password: hashedPwd,
        role: 1,
        status: 1
    }
    const user = {
        name: 'Muhaimin',
        phone: '01681319233',
        password: hashedPwd,
        role: 2,
        status: 1
    }
    const driver = {
        name: 'Karim',
        phone: '123456789',
        password: hashedPwd,
        role: 3,
        status: 1
    }

    const users = await getAllUsers();
    if (!users.length) {
        await User.create(admin);
        await User.create(user);
        await User.create(driver);
    }

}

module.exports = {
    customerRegister,
    getByPhone,
    login,
    loadUser
}
