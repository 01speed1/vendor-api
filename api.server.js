const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

const helmet = require('helmet');
app.use(helmet());

const swagger = require('./libs/documentation/swagger');

const apiRouter = express.Router();

(async () => {
  await swagger.UISetup(apiRouter);
})();

require('./api.routes')(apiRouter);
app.use('/api', apiRouter);

module.exports = app;
