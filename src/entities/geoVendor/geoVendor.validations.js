const { celebrate, Joi, Segments } = require('celebrate');

const searchValidation = celebrate({
  [Segments.QUERY]: Joi.object({
    address: Joi.string(),
    country: Joi.string(),
    zipcode: Joi.string(),
    lat: Joi.number(),
    lon: Joi.number()
  })
    .with('lat', 'lon')
    .or('address', 'lat')
});

module.exports = {
  searchValidation
};
