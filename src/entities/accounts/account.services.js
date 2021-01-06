const Account = require("../../db/models/account.model");
const serviceBuilder = require("../../../libs/serviceBuilder");

const { getAll, getOne, create, update, remove } = serviceBuilder(Account);

module.exports = {
    getAllAccounts: getAll,
    getAccount: getOne,
    createAccount: create,
    updateAccount: update,
    removeAccount: remove
};