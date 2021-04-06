const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api/');

const categoryValidations = require('./category.validations');
const categoryController = require('./category.controller');

router.get('/', apiMiddleware.validateJWT, categoryController.getAll);

router.post(
  '/',
  apiMiddleware.validateJWT,
  categoryValidations.createValidation,
  categoryController.create
);

module.exports = router;
