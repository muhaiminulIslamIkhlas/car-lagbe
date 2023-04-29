const http = require('http');
require('dotenv').config();
const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { loadUser } = require('./models/users.model');
const server = http.createServer(app);


const PORT = process.env.PORT || 8000;
async function startServer() {
    await mongoConnect();
    await loadUser();
    server.listen(PORT, () => {
        console.log("Server running on port " + PORT);
    });
}

startServer();