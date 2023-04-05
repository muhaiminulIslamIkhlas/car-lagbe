const express = require('express');
const planetRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');
const userRouter = require('./user/user.route');

const api = express.Router();
api.use('/planets',planetRouter);
api.use('/launches',launchesRouter);
api.use('/auth',userRouter);

module.exports = api;