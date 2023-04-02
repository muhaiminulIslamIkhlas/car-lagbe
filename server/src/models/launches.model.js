const launches = require('./launches.mongo');
const axios = require('axios');

const DEFAULT_FLIGHT_NUMBER = 100;

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function findLaunch(filter) {
    return await launches.findOne(filter);
}

async function populateLaunches() {
    console.log('Downloading data....');
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                }

            ]
        }
    });

    if (response.status !== 200) {
        console.log('Something wnt wrong');
        throw new Error('Something wnt wrong');
    }

    const launchesDocs = response.data.docs;
    for (const launchDoc of launchesDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        })

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            target: launchDoc['flight_number'],
            customers,
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
        }

        await saveLaunche(launch);
    }
}

async function loadLaunchesData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
    });

    if (firstLaunch) {
        console.log('data already loaded');
    } else {
        populateLaunches();
    }

}

async function saveLaunche(launch) {
    await launches.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    });
}

async function getAllLaunches(skip, limit) {
    console.log(skip)
    console.log(limit)
    return await launches
        .find({}, { '__v': 0, '_id': 0 })
        .sort({flightNumber: 1})
        .skip(skip)
        .limit(limit);
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches
        .findOne()
        .sort('-flightNumber');
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        customer: ['ZTM', 'NASA'],
        upcoming: true,
        success: true,
        flightNumber: newFlightNumber,
    });

    await saveLaunche(newLaunch);
}

async function existLaunchWithId(launchId) {
    return await findLaunch({ flightNumber: launchId });
}

async function abortLaunchById(launchId) {
    const aborted = await launches.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false
    });

    return aborted.modifiedCount === 1;
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existLaunchWithId,
    abortLaunchById,
    loadLaunchesData
}