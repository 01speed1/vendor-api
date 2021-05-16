const productModel = require('../../db/models/product.model');

const create = ({ subcategoryId, name, quantity, price }) => {
  return productModel.create({ subcategoryId, name, quantity, price });
};

const createMany = (productsList = []) => {
  return productModel.insertMany(productsList);
};

module.exports = { create, createMany };
