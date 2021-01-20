const businessModel = require('../../db/models/business.model');

const createByAccountId = accountId => {
    return businessModel.create({
        accountId
    });
};

module.exports = {
    createByAccountId
};