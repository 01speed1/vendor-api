const { celebrate, Joi, Segments } = require('celebrate');

const { isEmptyProductsOrServiceOffered } = require('../../utils/validations');

const createSchema = Joi.object({
  businessId: Joi.string().required(),
  orderId: Joi.string().required(),
  productsOffered: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number()
    })
  ),
  servicesOffered: Joi.array().items(
    Joi.object({
      serviceId: Joi.string().required(),
      price: Joi.number()
    })
  )
}).custom(isEmptyProductsOrServiceOffered);

const createValidation = celebrate({
  [Segments.BODY]: createSchema
});

module.exports = { createValidation };
