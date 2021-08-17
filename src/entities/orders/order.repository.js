const orderModel = require('../../db/models/order.model');

const customLabels = { docs: 'orders' };

const create = ({
  consumerId,
  location,
  destinyAddress,
  status,
  products,
  services,
  hoursLeft
}) => {
  return orderModel.create({
    consumerId,
    location,
    destinyAddress,
    status,
    products,
    services,
    hoursLeft
  });
};

const paginateOrders = ({ paginationOptions = {} }) => {
  return orderModel
    .paginate(
      {},
      {
        ...paginationOptions,
        select: '_id',
        customLabels
      }
    )
    .then(paginatedOrders => {
      const filteredOrders = paginatedOrders.orders.map(order => order['_id']);

      return { ...paginatedOrders, orders: filteredOrders };
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
