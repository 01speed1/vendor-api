require("dotenv").config();
const mongoose = require("mongoose");
const { DatabaseURLBuilder } = require('../libs/database/URLDBBuilder')

const dabaseUrl = DatabaseURLBuilder()

beforeEach(function (done) {
  function clearDB() {
    for (var collection in mongoose.connection.collections) {
      mongoose.connection.collections[collection].deleteOne(() => {});
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      dabaseUrl,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      (err) => {
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