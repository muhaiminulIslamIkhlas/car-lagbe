const express = require('express');
const { httpCustomerRegister } = require('./user.controller');

const userRouter = express.Router();

userRouter.get('/');
userRouter.post('/customer-register', httpCustomerRegister);
userRouter.post('/login');

module.exports = userRouter;