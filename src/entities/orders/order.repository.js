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

const getByConsumerId = consumerId => {
  return orderModel.find({ consumerId }).lean();
};

module.exports = {
  create,
  getAll,
  getByConsumerId
};
