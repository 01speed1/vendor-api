const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

const apiRoutes = require('./api.routes')();
app.use('/api', apiRoutes);

module.exports = app;
