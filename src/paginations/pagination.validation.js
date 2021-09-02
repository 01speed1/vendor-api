const { celebrate, Joi, Segments } = require('celebrate');

const paginationSchema = Joi.object({
  limit: Joi.number().optional().default(10),
  page: Joi.number().optional().default(1),
  offset: Joi.number().optional().default(0)
});

const paginationValidation = celebrate({
  [Segments.QUERY]: paginationSchema
});

module.exports = { paginationValidation };
