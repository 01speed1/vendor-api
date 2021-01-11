const router = require('express').Router();
const accountController = require('./account.controller');
const accountValidations = require('./account.validations');

router.post(
  '/signup',
  accountValidations.signUpValidation,
  accountController.signUp
);

module.exports = router;
