const productOfferedRepository = require('../productsOffered/productOffered.repository');
const serviceOfferedRepository = require('../servicesOffered/serviceOffered.repository');

const integrateOfferIdToList = ({ offerId, list = [] }) => {
  return list.map(element => ({ offerId, ...element }));
};

const createProductsAndServicesOffered = ({
  offerId,
  productsList = [],
  servicesList = []
}) => {
  if (!offerId) throw new Error('offerId is required');

  const updatedProductsList = integrateOfferIdToList({
    offerId,
    list: productsList
  });

  const updatedServiceList = integrateOfferIdToList({
    offerId,
    list: servicesList
  });

  return Promise.all([
    productOfferedRepository.createMany(updatedProductsList),
    serviceOfferedRepository.createMany(updatedServiceList)
  ]);
};

module.exports = {
  createProductsAndServicesOffered
};
