const productOfferedModel = require('../../db/models/productOffered');

const create = ({ offerId, productId, quantity, price }) => {
  return productOfferedModel.create({ offerId, productId, quantity, price });
};

const createMany = (productsList = []) => {
  return productOfferedModel.insertMany(productsList);
};

module.exports = { create, createMany };
