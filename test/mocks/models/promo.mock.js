const PromoModel = require('../../../src/db/models/promo.model');
const fakeGoose = require('../../../libs/fakeGoose');

module.exports = fakeGoose(PromoModel);
