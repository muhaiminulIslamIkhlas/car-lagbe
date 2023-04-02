const { getAllLaunches, scheduleNewLaunch, existLaunchWithId, abortLaunchById } = require('../../models/launches.model');
const { getPagination } = require('../../services/query');


async function httpGetAllLaunches(req, res) {
    const { skip, limit } = getPagination(req.query);
    console.log(req.query);
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
}

async function httpAddLaunches(req, res) {
    const launch = req.body;
    if (!launch.launchDate) {
        return res.status(400).json({
            error: 'Missing required launch property'
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunches(req, res) {
    const launchId = Number(req.params.id);
    const existLaunch = await existLaunchWithId(launchId);
    if (!existLaunch) {
        return res.status(404).json({
            error: 'Launch not found'
        })
    }

    const aborted = await abortLaunchById(launchId);
    return res.status(200).json(aborted);

}

module.exports = {
    httpGetAllLaunches,
    httpAddLaunches,
    httpAbortLaunches
}