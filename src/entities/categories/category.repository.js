const categoryModel = require('../../db/models/category.model');

const create = ({ name }) => {
  return categoryModel.create({ name });
};

module.exports = { create };
