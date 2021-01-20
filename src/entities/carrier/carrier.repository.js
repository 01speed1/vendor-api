const carrierModel = require('../../db/models/carrier.model');

const createByAccountId = accountId => {
    return carrierModel.create({
        accountId
    });
};

module.exports = {
    createByAccountId
};