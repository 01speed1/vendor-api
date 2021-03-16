const subcategoryModel = require('../../../src/db/models/subcategory.model');
const fakeGoose = require('../../../libs/fakeGoose');

module.exports = fakeGoose(subcategoryModel);
