const offerModel = require('../../../src/db/models/offer.model');
const fakeGoose = require('../../../libs/fakeGoose');

module.exports = fakeGoose(offerModel);
