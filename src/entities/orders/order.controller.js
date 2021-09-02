const orderRepository = require('./order.repository');
const orderServices = require('./order.services');

const getAll = async (request, response) => {
  try {
    const { query, pagination: paginationOptions } = request;

    const queryOptions = orderServices.buildQueryOptions(query);

    const paginatedOrders = await orderRepository.paginateOrders({
      queryOptions,
      paginationOptions
    });

    return response.json(paginatedOrders);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const create = async (request, response) => {
  try {
    const { body, account } = request;

    const { products, services } = body;

    if (products) {
      const createdProducts = await orderServices.createProducts(products);
      body.products = createdProducts.map(product => product._id);
    }

    if (services) {
      const createdServices = await orderServices.createServices(services);
      body.services = createdServices.map(service => service._id);
    }

    const orderData = { ...body, consumerId: account.consumerId };

    await orderRepository.create(orderData);

    response.json({ message: 'Order created' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  create
};
