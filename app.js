require('dotenv').config();
require('./config/database');

//TODO add a env variables validator

const apiServer = require('./api.server');

const port = process.env.NODE_PORT || 8080;

apiServer.listen(port, () => console.log(`API Server runnig in ${port}`));
