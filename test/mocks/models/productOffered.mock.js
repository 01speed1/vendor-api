const ProductOfferedModel = require('../../../src/db/models/productOffered');
const fakeGoose = require('../../../libs/fakeGoose');

module.exports = fakeGoose(ProductOfferedModel);
