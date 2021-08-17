const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api/');

const paginationValidation = require('../../paginations/pagination.validation');

const orderMiddleware = require('./order.middlewares');
const orderValidations = require('./order.validations');
const orderController = require('./order.controller');

router.get(
  '/',
  paginationValidation.paginationValidation,
  orderMiddleware.getAllGuest,
  apiMiddleware.validateJWT,
  orderController.getAll
);

router.post(
  '/',
  apiMiddleware.validateJWT,
  apiMiddleware.getRolesByLoggedAccount,
  orderValidations.createValidation,
  orderController.create
);

module.exports = router;
