const { celebrate, Joi, Segments } = require('celebrate');

const signupSchema = {
  email: Joi.string().email().required(),
  identificationPhone: Joi.string().required(),
  password: Joi.string().required(),
  validatePassword: Joi.ref('password'),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
};

const signUpValidation = celebrate({
  [Segments.BODY]: Joi.object(signupSchema).with('password', 'validatePassword')
});

const loginSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().required()
};

const logInValidation = celebrate({
  [Segments.BODY]: Joi.object(loginSchema)
});

module.exports = {
  signupSchema,
  loginSchema,
  signUpValidation,
  logInValidation
};
