const Order = require("./order.model");

const serviceBuilder = require("../../libs/serviceBuilder");

const { getAll, getOne, create, update, remove } = serviceBuilder(Order);

module.exports = {
  getAllOrders: getAll,
  getOrder: getOne,
  createOrder: create,
  updateOrder: update,
  removeOrder: remove
};
