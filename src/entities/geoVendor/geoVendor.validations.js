const { celebrate, Joi, Segments } = require('celebrate');

const searchValidation = celebrate({
  [Segments.QUERY]: Joi.object({
    address: Joi.string().required(),
    country: Joi.string(),
    zipcode: Joi.string()
  })
});

module.exports = {
  searchValidation
};
