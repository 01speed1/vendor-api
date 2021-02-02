const productModel = require('../../db/models/product.model');

const create = ({ name, quantity, price }) => {
  return productModel.create({ name, quantity, price });
};

const createMany = (productsList = []) => {
  return productModel.insertMany(productsList);
};

module.exports = { create, createMany };
