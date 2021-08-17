const orderRepository = require('./order.repository');

const ignoredKeys = {
  ['__v']: 0,
  consumerId: 0,
  destinyAddress: {
    neighborhood: 0,
    apartament: 0,
    additionalDescription: 0
  },
  status: 0,
  modifiedAt: 0
};

const getAllGuest = async (request, response, next) => {
  if (request.headers.authorization) {
    return next();
  }

  try {
    const { query: paginationOptions } = request;

    const PaginatedOrdersRaw = await orderRepository.paginateOrders({
      paginationOptions
    });

    const foundOrders = await orderRepository.getManyByIds(
      PaginatedOrdersRaw.orders,
      { ignoredKeys }
    );

    const paginatedOrders = {
      ...PaginatedOrdersRaw,
      orders: foundOrders
    };

    return response.status(251).json(paginatedOrders);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error.message });
  }
};

module.exports = { getAllGuest };
