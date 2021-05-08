require('dotenv').config();
require('./config/database');

const logger = require("./libs/logger")

global.ROOT_DIRNAME = __dirname;

const port = process.env.NODE_PORT || 8080;

const apiServer = require('./api.server');

apiServer.listen(port, () => console.log(`API Server running in ${port}`));
