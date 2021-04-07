const { celebrate, Joi, Segments } = require('celebrate');

const createSchema = Joi.object({
  name: Joi.string().required()
});

const createValidation = celebrate({
  [Segments.BODY]: createSchema
});

module.exports = {
  createValidation
};
