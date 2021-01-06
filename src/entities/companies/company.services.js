const Company = require("../../db/models/companies.model");

const serviceBuilder = require("../../libs/serviceBuilder");

const { getAll, getOne, create, update, remove } = serviceBuilder(Company);

module.exports = {
    getAllCompanies: getAll,
    getCompany: getOne,
    createCompany: create,
    updateCompany: update,
    removeCompany: remove
};