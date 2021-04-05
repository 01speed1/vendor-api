const subcategoryModel = require('../../db/models/subcategory.model');

const create = ({ categoryId, name }) => {
  return subcategoryModel.create({ name, categoryId });
};

module.exports = { create };
