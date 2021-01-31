const carrierModel = require('../../../src/db/models/carrier.model');
const fakeGoose = require('../../../libs/fakeGoose');

module.exports = fakeGoose(carrierModel);
