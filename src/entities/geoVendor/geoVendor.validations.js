const { celebrate, Joi, Segments } = require('celebrate');

const searchSchema = {
  address: Joi.string(),
  country: Joi.string(),
  zipcode: Joi.string(),
  lat: Joi.number(),
  lon: Joi.number()
};

const searchValidation = celebrate({
  [Segments.QUERY]: Joi.object().with('lat', 'lon').or('address', 'lat')
});

module.exports = {
  searchSchema,
  searchValidation
};
