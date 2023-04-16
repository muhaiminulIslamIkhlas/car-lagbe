const express = require('express');
const { httpCustomerRegister, httpLogin } = require('./user.controller');

const userRouter = express.Router();

userRouter.get('/');
userRouter.post('/customer-register', httpCustomerRegister);
userRouter.post('/login', httpLogin);

module.exports = userRouter;