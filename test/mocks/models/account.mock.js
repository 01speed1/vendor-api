const accountModel = require('../../../src/db/models/account.model');
const fakeGoose = require('../../../libs/fakeGoose');

module.exports = fakeGoose(accountModel);
