const Joi = require('joi');
const { async } = require('validate.js');

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  // TODO validate format
  identificationPhone: Joi.string().required(),
  password: Joi.string().required(),
  validatePassword: Joi.ref('password'),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
}).with('password', 'validatePassword');

const signUpValidation = async (request, response, next) => {
  try {
    const { body } = request;

    const validatedBody = await signupSchema.validateAsync(body);

    request.body = validatedBody;

    next();
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};



module.exports = {
  signUpValidation
};
