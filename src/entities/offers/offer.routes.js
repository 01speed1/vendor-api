const router = require('express').Router();

const offerValidation = require('./offer.validations');
const apiMiddleware = require('../../middlewares/api/');

const offerController = require('./offer.controller');

router.post(
  '/',
  apiMiddleware.validateJWT,
  apiMiddleware.getRolesByLoggedAccount,
  offerValidation.createValidation,
  offerController.create
);

module.exports = router;
