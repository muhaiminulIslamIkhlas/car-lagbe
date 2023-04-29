const jwt = require('jsonwebtoken')
const { customerRegister, getByPhone, login } = require("../../models/users.model");

async function httpCustomerRegister(req, res) {
    const { phone } = req.body;
    const duplicate = await getByPhone(phone);
    let errors;
    if (duplicate) {
        errors = {
            'phone': 'Phone already exist'
        };
        return res.status(422).json({ errors });
    }

    const response = await customerRegister(req);
    return res.status(201).json(response);
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

async function httpLogin(req, res) {
    const { password, phone } = req.body;
    const user = await getByPhone(phone);

    if (!user) {
        return res.status(400).json({ message: 'Phone not found' });
    }

    const match = await login(user, password);

    if (!match) {
        return res.status(401).json({ message: 'Please check phone and password' });
    }

    const accessToken = generateToken({
        "username": user.username,
        "roles": user.roles,
        "websiteId": user.websiteId,
    });

    const userResponse = {
        name: user.name,
        role: user.role,
        phone: user.phone,
    }

    return res.status(200).json({ results: { accessToken, user: userResponse, message: 'Login Successfully' } });
}

module.exports = {
    httpCustomerRegister,
    httpLogin
}