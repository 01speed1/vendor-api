const router = require('express').Router();
const consumerController = require('./consumer.controller');

const authMiddleware = require('../../middlewares/api/auth.middlewares');

const apiMiddleware = require('../../middlewares/api/getAccountIds.middlewares');

router.get(
  '/orders',
  authMiddleware.validateJWT,
  apiMiddleware.getRolesByLoggedAccount,
  consumerController.getOrders
);

module.exports = router;
