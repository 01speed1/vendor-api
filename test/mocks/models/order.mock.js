const OrderModel = require('../../../src/db/models/order.model');
const fakeGoose = require('../../../libs/fakeGoose');

module.exports = fakeGoose(OrderModel);
