const orderRepository = require('./order.repository');

const getAll = async (request, response) => {
  try {
    const orders = await orderRepository.getAll().lean();

    response.json({ orders });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll
};
