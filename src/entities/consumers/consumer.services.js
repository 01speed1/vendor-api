const orderRepository = require('../orders/order.repository');

const getOrdersById = consumerId => {
  return orderRepository.getByConsumerId(consumerId);
};

module.exports = {
  getOrdersById
};
