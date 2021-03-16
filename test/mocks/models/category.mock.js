const categoryModel = require('../../../src/db/models/category.model');
const fakeGoose = require('../../../libs/fakeGoose');

module.exports = fakeGoose(categoryModel);
