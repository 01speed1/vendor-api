const orderRepository = require('../orders/order.repository');

const getOrdersById = consumerId => {
  return orderRepository.getByConsumerId(consumerId);
};

const getAOrder = ({ consumerId, _id }) => {
  return orderRepository.getConsumerOrder({ consumerId, _id });
};

module.exports = {
  getOrdersById,
  getAOrder
};
