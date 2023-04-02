const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;


mongoose.connection.once('open', () => {
    console.log("Mongodb connection ready");
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect(){
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect(){
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}