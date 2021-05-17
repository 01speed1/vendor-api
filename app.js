require('dotenv').config();
const dbConnection = require('./src/db/mongoose');
const logger = require('./libs/logger');

global.ROOT_DIRNAME = __dirname;
global.logger = logger;

const port = process.env.NODE_PORT || 8080;

(async () => {
  try {
    logger.info('Starting Server...');
    await dbConnection;
    logger.info('database connection established');

    const apiServer = require('./api.server');

    apiServer.listen(port, () => {
      let startMessage = `API Server running in ${port}`;

      logger.info(startMessage);
    });
  } catch (error) {
    console.error(error.message);
    logger.error(error.message);
    process.exit(1);
  }
})();
