const consumerModel = require('../../db/models/consumer.model');

const createByAccountId = accountId => {
  return consumerModel.create({
    accountId
  });
};

const findByAccountId = accountId => {
  return consumerModel.findOne({ accountId });
};

module.exports = {
  createByAccountId,
  findByAccountId
};
