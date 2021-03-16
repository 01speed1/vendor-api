const Joi = require('joi');

const isEmptyProductsOrService = (value, helpers) => {
  const isEmptyProducts =
    value.productsOffered && value.productsOffered.length > 0;
  const isEmptyServices =
    value.servicesOffered && value.servicesOffered.length > 0;

  if (!isEmptyProducts && !isEmptyServices) {
    return helpers.message(
      'We need a least one product or service to create an offer'
    );
  }

  return value;
};

const createSchema = Joi.object({
  businessId: Joi.string().required(),
  orderId: Joi.string().required(),
  state: Joi.string(),
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
}).custom(isEmptyProductsOrService);

const createValidation = async (request, response, next) => {
  try {
    const { body } = request;

    const validatedBody = await createSchema.validateAsync(body);

    request.body = validatedBody;

    next();
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = { createValidation };