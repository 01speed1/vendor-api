const consumerServices = require('./consumer.services');

const getOrders = async (request, response) => {
  try {
    const { consumerId } = request.account;

    const orders = await consumerServices.getOrdersById(consumerId);

    response.json({ orders });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

module.exports = {
  getOrders
};
