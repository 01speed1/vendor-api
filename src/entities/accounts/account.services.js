const consumerRepository = require('../consumers/consumer.repository');
const businessRepository = require('../business/business.repository');
const carrierRepository = require('../carriers/carrier.repository');

const createRoles = accountId => {
  return Promise.all([
    consumerRepository.createByAccountId(accountId),
    businessRepository.createByAccountId(accountId),
    carrierRepository.createByAccountId(accountId)
  ]);
};

module.exports = {
  createRoles
};
