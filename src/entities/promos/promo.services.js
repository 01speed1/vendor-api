const { TYPES } = require('./promo.constants');
const productRepository = require('../products/product.repository');
const serviceRepository = require('../services/service.repository');

const createProducts = (productsList = []) => {
  return productRepository.createMany(productsList);
};

const createProduct = ({ subcategoryId, name, quantity }) => {
  return productRepository.create({ subcategoryId, name, quantity });
};

const createServices = (servicesList = []) => {
  return serviceRepository.createMany(servicesList);
};

const updateFreeProductBody = async body => {
  const freeProductType = TYPES['FREE_PRODUCT'];

  if (body.type?.name === freeProductType)
    body.type[freeProductType] = await createProduct(
      body.type[freeProductType]
    );

  return body;
};

module.exports = {
  createProducts,
  createServices,
  createProduct,
  updateFreeProductBody
};
