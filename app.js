require('dotenv').config();
const dbConnection = require('./config/database');

global.ROOT_DIRNAME = __dirname;

const port = process.env.NODE_PORT || 8080;

(async () => {
  try {
    console.log('Starting Server...');
    await dbConnection;
    console.log('database connection established');

    const apiServer = require('./api.server');

    apiServer.listen(port, () => console.log(`API Server running in ${port}`));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();
