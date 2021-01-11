const orderModel = require('../../db/models/order.model');

const create = ({
  consumerId,
  location,
  destinyAddress,
  status,
  products,
  services
}) => {
  return orderModel.create({
    consumerId,
    location,
    destinyAddress,
    status,
    products,
    services
  });
};

const getAll = () => {
  return orderModel.find();
};

module.exports = {
  create,
  getAll
};
