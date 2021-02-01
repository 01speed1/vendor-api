const service = require('../../db/models/service.model');

const create = ({ name, price }) => {
  return service.create({ name, price });
};

const createMany = (servicesList = []) => {
  return service.insertMany(servicesList);
};

module.exports = { create, createMany };
