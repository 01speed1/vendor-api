require('dotenv').config();
require('./config/database');

const apiServer = require('./api.server');

const port = process.env.NODE_PORT || 8080;

apiServer.listen(port, () => console.log(`API Server runnig in ${port}`));
