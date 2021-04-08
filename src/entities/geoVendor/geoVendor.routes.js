const router = require('express').Router();

const geoVendorValidation = require('./geoVendor.validations');
const apiMiddleware = require('../../middlewares/api/');

const geoVendorController = require('./geoVendor.controller');

router.get(
  '/',
  apiMiddleware.validateJWT,
  geoVendorValidation.searchValidation,
  geoVendorController.search
);

module.exports = router;
