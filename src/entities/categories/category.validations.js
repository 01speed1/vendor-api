const { celebrate, Joi, Segments } = require('celebrate');

const createSchema = {
  name: Joi.string().required()
};

const createValidation = celebrate({
  [Segments.BODY]: Joi.object(createSchema)
});

module.exports = {
  createSchema,
  createValidation
};
