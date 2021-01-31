const consumerModel = require('../../db/models/consumer.model');

const createByAccountId = accountId => {
  return consumerModel.create({
    accountId
  });
};

module.exports = {
  createByAccountId
};
