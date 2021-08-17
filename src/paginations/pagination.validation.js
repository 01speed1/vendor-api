const { celebrate, Joi, Segments } = require('celebrate');

const paginationSchema = Joi.object({
  limit: Joi.number().default(10),
  page: Joi.number().default(1),
  offset: Joi.number().default(0)
});

const paginationValidation = celebrate({
  [Segments.QUERY]: paginationSchema
});

module.exports = { paginationValidation };
