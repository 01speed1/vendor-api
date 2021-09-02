const { celebrate, Joi, Segments } = require('celebrate');

const joinAndValidateQueryParams = (...parameters) =>
  celebrate({
    [Segments.QUERY]: Joi.object(
      parameters.reduce((memory, current) => ({ ...memory, ...current }), {})
    )
  });

module.exports = { joinAndValidateQueryParams };
