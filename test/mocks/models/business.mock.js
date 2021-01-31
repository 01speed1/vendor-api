const businessModel = require('../../../src/db/models/business.model');
const fakeGoose = require('../../../libs/fakeGoose');

module.exports = fakeGoose(businessModel);
