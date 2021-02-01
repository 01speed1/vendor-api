const productRepository = require('../products/product.repository');
const serviceRepository = require('../services/service.repository');

const createProducts = (productsList = []) => {
  return productRepository.createMany(productsList);
};

const createServices = (servicesList = []) => {
  return serviceRepository.createMany(servicesList);
};

module.exports = { createProducts, createServices };
