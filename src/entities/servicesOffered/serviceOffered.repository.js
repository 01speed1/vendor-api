const serviceOfferedModel = require('../../db/models/serviceOffered');

const create = ({ offerId, serviceId, price }) => {
  return serviceOfferedModel.create({ offerId, serviceId, price });
};
const createMany = (servicesList = []) => {
  return serviceOfferedModel.insertMany(servicesList);
};

module.exports = { create, createMany };
