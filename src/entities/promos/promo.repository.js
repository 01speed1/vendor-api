const promoModel = require('../../db/models/promo.model');

const create = ({ businessId, products, services, hoursLeft, type }) => {
  return promoModel.create({ businessId, products, services, hoursLeft, type });
};

module.exports = { create };
