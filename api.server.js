const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

const helmet = require('helmet');
app.use(helmet());

const apiRoutes = require('./api.routes')();
app.use('/api', apiRoutes);

module.exports = app;
