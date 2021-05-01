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
  return orderModel
    .find({ consumerId })
    .populate('products')
    .populate('services')
    .lean();
};

const getConsumerOrder = ({ consumerId, _id }) => {
  return orderModel
    .findOne({ consumerId, _id })
    .populate('products')
    .populate('services')
    .lean();
};

module.exports = {
  create,
  getAll,
  getConsumerOrder,
  getByConsumerId
};
