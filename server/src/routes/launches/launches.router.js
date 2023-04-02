const express = require('express');
const { httpGetAllLaunches, httpAddLaunches, httpAbortLaunches } = require('./launches.controller');


const launchRouter = express.Router();
launchRouter.get('/',httpGetAllLaunches);
launchRouter.post('/',httpAddLaunches);
launchRouter.delete('/:id',httpAbortLaunches);

module.exports = launchRouter;