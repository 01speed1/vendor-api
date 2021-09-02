const orderModel = require('../../db/models/order.model');

const customLabels = { docs: 'orders' };

const create = ({
  consumerId,
  location,
  destinyAddress,
  status,
  products,
  services,
  hoursLeft,
  createdAt,
  finishedAt
}) => {
  return orderModel.create({
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

const paginateOrders = ({ queryOptions = {}, paginationOptions = {} }) => {
  return orderModel.paginate(queryOptions, {
    ...paginationOptions,
    customLabels,
    lean: true,
    populate: ['products', 'services'],
    leanWithId: false
  });
};

const getManyByIds = (ids = [], options = {}) => {
  const { ignoredKeys = {} } = options;

  return orderModel
    .find()
    .where('_id')
    .in(ids)
    .lean({ virtuals: true })
    .select(ignoredKeys);
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
  getConsumerOrder,
  getByConsumerId,
  getManyByIds,
  paginateOrders
};
