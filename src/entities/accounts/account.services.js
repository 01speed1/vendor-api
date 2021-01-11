const consumerRepository = require('../consumer/consumer.repository');

const createRoles = accountId => {
  return Promise.all([consumerRepository.createByAccountId(accountId)]);
};

module.exports = {
  createRoles
};
