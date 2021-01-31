const consumerRepository = require('../../entities/consumers/consumer.repository');
const carrierRepository = require('../../entities/carriers/carrier.repository');
const businessRepository = require('../../entities/business/business.repository');

const getRolesByLoggedAccount = async (request, response, next) => {
  try {
    const loggedAccount = request.account;

    const [
      { _id: consumerId },
      { _id: carrierId },
      { _id: businessId }
    ] = await Promise.all([
      consumerRepository.findByAccountId(loggedAccount.accountId),
      carrierRepository.findByAccountId(loggedAccount.accountId),
      businessRepository.findByAccountId(loggedAccount.accountId)
    ]);

    request.account = {
      ...loggedAccount,
      consumerId,
      carrierId,
      businessId
    };

    next();
  } catch (error) {
    response.status(401).json({
      message: 'your account have incomplete roles',
      details: error.message
    });
  }
};

module.exports = { getRolesByLoggedAccount };
