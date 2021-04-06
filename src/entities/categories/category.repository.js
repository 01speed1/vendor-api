const categoryModel = require('../../db/models/category.model');

const getAll = () => {
  return categoryModel.find();
};

const create = ({ name }) => {
  return categoryModel.create({ name });
};

module.exports = { getAll, create };
