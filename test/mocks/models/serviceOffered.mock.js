const serviceOfferedModel = require('../../../src/db/models/serviceOffered');
const fakeGoose = require('../../../libs/fakeGoose');

module.exports = fakeGoose(serviceOfferedModel);
