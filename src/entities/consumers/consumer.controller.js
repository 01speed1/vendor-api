const consumerServices = require('./consumer.services');

const getOrder = async (request, response) => {
  try {
    const { consumerId } = request.account;
    const { orderId } = request.params;

    const foundOrder = await consumerServices.getAOrder({
      consumerId,
      _id: orderId
    });

    return response.json({ order: foundOrder });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

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
  getOrder,
  getOrders
};
