const { celebrate, Joi, Segments } = require('celebrate');

const { isEmptyProductsOrService } = require('../../utils/validations');

const createSchema = Joi.object({
  location: Joi.object({
      lat: Joi.number().required(),
      lon: Joi.number().required()
  }).required(),
  destinyAddress: Joi.object({
    address: Joi.string().required(),
    neighborhood: Joi.string().required(),
    apartament: Joi.number(),
    additionalDescription: Joi.string()
  }).required(),
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
}).custom(isEmptyProductsOrService);

const createValidation = celebrate({
  [Segments.BODY]: createSchema
});

module.exports = { createValidation };
