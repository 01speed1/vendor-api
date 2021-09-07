const { celebrate, Joi, Segments } = require('celebrate');

const paginationSchema = {
  limit: Joi.number().optional().default(10),
  page: Joi.number().optional().default(1),
  offset: Joi.number().optional().default(0)
};

const paginationValidation = celebrate({
  [Segments.QUERY]: Joi.object(paginationSchema)
});

module.exports = { paginationValidation, paginationSchema };
