const { celebrate, Joi, Segments } = require('celebrate');

const createValidation = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    categoryId: Joi.string().required()
  })
});

module.exports = {
  createValidation
};
