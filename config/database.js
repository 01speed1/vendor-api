const mongoose = require('mongoose');
const { DatabaseURLBuilder } = require('../libs/database/URLDBBuilder');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true,
  keepAlive: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
  useFindAndModify: false,
  useUnifiedTopology: true
};

const dabaseUrl = DatabaseURLBuilder();

module.exports = mongoose
  .connect(dabaseUrl, options)
  .then(database => console.log('database connection stablished'))
  .catch(error => console.log('error database ', error));
