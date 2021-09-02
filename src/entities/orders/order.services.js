const { DateTime } = require('luxon');

const productRepository = require('../products/product.repository');
const serviceRepository = require('../services/service.repository');
const orderRepository = require('./order.repository');

const { PRIORITIES } = require('./order.constants');

const createProducts = (productsList = []) => {
  return productRepository.createMany(productsList);
};

const createServices = (servicesList = []) => {
  return serviceRepository.createMany(servicesList);
};

const buildSearchParametersByPriority = (priority = []) => {
  if (!priority.length) return {};

  let rangeSizeToFinish = 0;

  if (priority.includes(PRIORITIES.HIGH)) rangeSizeToFinish = 2;
  if (priority.includes(PRIORITIES.MEDIUM)) rangeSizeToFinish = 6;
  if (priority.includes(PRIORITIES.LOW)) rangeSizeToFinish = 12;

  const now = DateTime.local();

  let parametersByPriority = {
    finishedAt: {
      $gte: now.toJSDate(),
      $lte: now.plus({ hours: rangeSizeToFinish }).toJSDate()
    }
  };

  return parametersByPriority;
};

const buildQueryOptions = (queryParams = {}) => {
  let queryOptions = {};

  if (queryParams.priority) {
    const optionsByPriority = buildSearchParametersByPriority(
      queryParams.priority
    );
    queryOptions = { ...queryOptions, ...optionsByPriority };
  }

  return queryOptions;
};

const create = ({
  consumerId,
  location,
  destinyAddress,
  status,
  products,
  services,
  hoursLeft,
  createdAt = DateTime.now()
}) => {
  const finishedAt = createdAt.plus({ hours: hoursLeft });

  return orderRepository.create({
    consumerId,
    location,
    destinyAddress,
    status,
    products,
    services,
    hoursLeft,
    createdAt,
    finishedAt
  });
};

module.exports = { create, createProducts, createServices, buildQueryOptions };
