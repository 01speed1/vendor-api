const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api/');

const orderValidations = require('./order.validations');

const orderController = require('./order.controller');

router.get('/', orderController.getAll);

router.post(
  '/',
  apiMiddleware.validateJWT,
  apiMiddleware.getRolesByLoggedAccount,
  orderValidations.createValidation,
  orderController.create
);

module.exports = router;
