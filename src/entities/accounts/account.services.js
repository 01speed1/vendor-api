const consumerRepository = require('../consumer/consumer.repository');
const businessRepository = require('../business/business.repository');
const carrierRepository = require('../carrier/carrier.repository');

const createRoles = accountId => {
  return Promise.all([consumerRepository.createByAccountId(accountId)],
    [businessRepository.createByAccountId(accountId)],
    [carrierRepository.createByAccountId(accountId)]);
};

module.exports = {
  createRoles
};
