const { customerRegister, getByPhone } = require("../../models/users.model");

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

module.exports = {
    httpCustomerRegister
}