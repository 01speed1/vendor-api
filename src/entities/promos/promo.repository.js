const promoModel = require('../../db/models/promo.model');

const create = ({ businessId, products, services, hoursLeft, type }) => {
  return promoModel.create({ businessId, products, services, hoursLeft, type });
};

const get = () => {
  return promoModel.find().populate('products').populate('services').lean();
};

module.exports = { create, get };
