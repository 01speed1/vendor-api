const serviceModel = require('../../../src/db/models/service.model');
const fakeGoose = require('../../../libs/fakeGoose');

module.exports = fakeGoose(serviceModel);
