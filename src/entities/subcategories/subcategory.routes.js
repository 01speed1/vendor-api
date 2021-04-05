const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');

const subcategoryValidations = require('./subcategory.validations');
const subcategoryController = require('./subcategory.controller');

router.post(
  '/',
  apiMiddleware.validateJWT,
  subcategoryValidations.createValidation,
  subcategoryController.create
);

module.exports = router;
