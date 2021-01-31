const carrierModel = require('../../db/models/carrier.model');

const createByAccountId = accountId => {
  return carrierModel.create({
    accountId
  });
};

const findByAccountId = accountId => {
  return carrierModel.findOne({ accountId });
};

module.exports = {
  createByAccountId,
  findByAccountId
};
