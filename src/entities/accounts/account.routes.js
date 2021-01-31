const router = require('express').Router();
const accountController = require('./account.controller');
const accountValidations = require('./account.validations');
const accountMiddleware = require('./account.middlewares');

router.post(
  '/signup',
  accountValidations.signUpValidation,
  accountController.signUp
);

router.post(
  '/login',
  accountValidations.logInValidation,
  accountMiddleware.accountExist,
  accountController.logIn
);

module.exports = router;
