const offerModel = require('../../db/models/offer.model');

const create = ({ businessId, orderId }) => {
  return offerModel.create({ businessId, orderId });
};

const getAll = () => {
  return offerModel.find();
};

module.exports = { 
  create,
  getAll
};
