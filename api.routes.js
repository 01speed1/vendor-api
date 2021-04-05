const accountRoutes = require('./src/entities/accounts/account.routes');
const orderRoutes = require('./src/entities/orders/order.routes');
const offerRoutes = require('./src/entities/offers/offer.routes');
const consumerRoutes = require('./src/entities/consumers/consumer.routes');
const categoryRoutes = require('./src/entities/categories/category.routes');
const subcategoryRoutes = require('./src/entities/subcategories/subcategory.routes');

module.exports = router => {
  router.use('/accounts', accountRoutes);

  router.use('/orders', orderRoutes);

  router.use('/offers', offerRoutes);

  router.use('/consumers', consumerRoutes);

  router.use('/categories', categoryRoutes);

  router.use('/subcategories', subcategoryRoutes);
};
