const orderRepository = require('./order.repository');
const orderServices = require('./order.services');

const ignoredKeys = {
  ['__v']: 0,
  consumerId: 0,
  destinyAddress: {
    neighborhood: 0,
    apartment: 0,
    additionalDescription: 0
  },
  status: 0,
  modifiedAt: 0
};

const selectKeys = {
  _id: 1,
  destinyAddress: {
    address: 1
  },
  products: 1,
  services: 1,
  hoursLeft: 1,
  finishedAt: 1,
  createdAt: 1
};

const getAllGuest = async (request, response, next) => {
  if (request.headers.authorization) {
    return next();
  }

  try {
    const { query, pagination: paginationOptions } = request;

    const queryOptions = orderServices.buildQueryOptions(query);

    const paginatedOrders = await orderRepository.paginateOrders({
      queryOptions,
      paginationOptions: { ...paginationOptions, select: selectKeys }
    });

    return response.status(251).json(paginatedOrders);
  } catch (error) {
    response.status(500).json({ message: error.message, error });
  }
};

module.exports = { getAllGuest };
