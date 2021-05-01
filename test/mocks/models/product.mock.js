const ProductModel = require('../../../src/db/models/product.model');
const fakeGoose = require('../../../libs/fakeGoose');

module.exports = fakeGoose(ProductModel);
