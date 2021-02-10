const offerModel = require('../../db/models/offer.model');

const create = ({ businessId, orderId }) => {
  return offerModel.create({ businessId, orderId });
};

module.exports = { create };
