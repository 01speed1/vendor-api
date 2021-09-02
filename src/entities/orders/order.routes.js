const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api/');

const paginationValidation = require('../../paginations/pagination.validation');
const paginationMiddleware = require('../../paginations/pagination.middlewares');

const orderMiddleware = require('./order.middlewares');
const orderValidations = require('./order.validations');
const orderController = require('./order.controller');

router.get(
  '/',
  apiMiddleware.joinAndValidateQueryParams(
    paginationValidation.paginationSchema,
    orderValidations.filterSchema
  ),
  paginationMiddleware.groupPaginationParams,
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
