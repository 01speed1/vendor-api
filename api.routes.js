const router = require('express').Router();

const accountRoutes = require('./src/entities/accounts/account.routes');
const orderRoutes = require('./src/entities/orders/order.routes');
const offerRoutes = require('./src/entities/offers/offer.routes');

module.exports = () => {
  router.use('/accounts', accountRoutes);

  router.use('/orders', orderRoutes);

  router.use('/offers', offerRoutes);

  return router;
};
