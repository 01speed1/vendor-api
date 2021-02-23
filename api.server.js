const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

const helmet = require('helmet');
app.use(helmet());

const apiRouter = express.Router();
require('./api.routes')(apiRouter);
app.use('/api', apiRouter);

module.exports = app;
