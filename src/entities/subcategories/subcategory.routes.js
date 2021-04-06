const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');

const subcategoryValidations = require('./subcategory.validations');
const subcategoryController = require('./subcategory.controller');

router.get(
  '/category/:categoryId',
  apiMiddleware.validateJWT,
  subcategoryController.getByCategoryId
);

router.post(
  '/',
  apiMiddleware.validateJWT,
  subcategoryValidations.createValidation,
  subcategoryController.create
);

module.exports = router;
