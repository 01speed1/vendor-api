const { celebrate, Joi, Segments } = require('celebrate');

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  // TODO validate format
  identificationPhone: Joi.string().required(),
  password: Joi.string().required(),
  validatePassword: Joi.ref('password'),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
}).with('password', 'validatePassword');

const signUpValidation = celebrate({
  [Segments.BODY]: signupSchema
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const logInValidation = celebrate({
  [Segments.BODY]: loginSchema
});

module.exports = {
  signUpValidation,
  logInValidation
};
