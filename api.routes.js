//TODO skatin create index by entity to import all routes

const router = require('express').Router();

const accountRoutes = require('./src/entities/accounts/account.routes');
const orderRoutes = require('./src/entities/orders/order.routes');

module.exports = () => {
  router.use('/accounts', accountRoutes);

  router.use('/orders', orderRoutes);

  return router;
};
