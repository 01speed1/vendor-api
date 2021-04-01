require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const supertest = require('supertest');

global.ROOT_DIRNAME = path.resolve('./');
const databaseUrl = global.__MONGO_URI__;

beforeEach(function (done) {
  function clearDB() {
    for (var collection in mongoose.connection.collections) {
      mongoose.connection.collections[collection].deleteOne(() => {});
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      databaseUrl,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      },
      err => {
        if (err) {
          throw err;
        }
        return clearDB();
      }
    );
  } else {
    return clearDB();
  }
});

afterAll(function (done) {
  mongoose.disconnect();
  return done();
});

const apiServerConnection = () => {
  const apiServer = require('../api.server');

  return supertest(apiServer);
};

module.exports = {
  apiServerConnection
};
