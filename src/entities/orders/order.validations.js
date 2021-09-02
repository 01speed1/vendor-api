const { celebrate, Joi, Segments } = require('celebrate');

const { isEmptyProductsOrService } = require('../../utils/validations');

const { PRIORITIES } = require('./order.constants');

const createSchema = {
  location: Joi.object({
    lat: Joi.number().required(),
    lon: Joi.number().required()
  }).required(),
  destinyAddress: Joi.object({
    address: Joi.string().required(),
    neighborhood: Joi.string().required(),
    apartment: Joi.number(),
    additionalDescription: Joi.string()
  }).required(),
  hoursLeft: Joi.number().required(),
  products: Joi.array().items(
    Joi.object({
      subcategoryId: Joi.string().required(),
      name: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number()
    })
  ),
  services: Joi.array().items(
    Joi.object({
      description: Joi.string().required(),
      subcategoryId: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number()
    })
  )
};

const createValidation = celebrate({
  [Segments.BODY]: Joi.object(createSchema).custom(isEmptyProductsOrService)
});

const filterSchema = {
  priority: Joi.array().items(
    Joi.string().valid(PRIORITIES.LOW, PRIORITIES.MEDIUM, PRIORITIES.HIGH)
  )
};

const filterValidation = celebrate({
  [Segments.QUERY]: Joi.object(filterSchema)
});

module.exports = {
  createSchema,
  filterSchema,
  createValidation,
  filterValidation
};
