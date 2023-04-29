const express = require('express');
const userRouter = require('./user/user.route');

const api = express.Router();
api.use('/auth',userRouter);

module.exports = api;