const businessModel = require('../../db/models/business.model');

const createByAccountId = accountId => {
  return businessModel.create({
    accountId
  });
};

const findByAccountId = accountId => {
  return businessModel.findOne({ accountId });
};

module.exports = {
  createByAccountId,
  findByAccountId
};
