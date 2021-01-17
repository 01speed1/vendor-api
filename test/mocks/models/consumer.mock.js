const consumerModel = require('../../../src/db/models/consumer.model');
const fakeGoose = require('../../../libs/fakeGoose');

module.exports = fakeGoose(consumerModel);
