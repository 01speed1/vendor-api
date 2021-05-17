const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api/');

const promoValidations = require('./promo.validations');

const promoController = require('./promo.controller');

router.get('/', promoController.get);

router.post(
  '/',
  apiMiddleware.validateJWT,
  apiMiddleware.getRolesByLoggedAccount,
  promoValidations.createValidation,
  promoController.create
);

module.exports = router;
