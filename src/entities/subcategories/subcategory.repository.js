const subcategoryModel = require('../../db/models/subcategory.model');

const getByCategoryId = categoryId => {
  return subcategoryModel.find({ categoryId });
};

const create = ({ categoryId, name }) => {
  return subcategoryModel.create({ name, categoryId });
};

module.exports = { getByCategoryId, create };
