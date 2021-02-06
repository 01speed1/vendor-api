const Joi = require('joi');

const isEmptyProductsOrService = (value, helpers) => {
  const isEmptyProducts = value.products && value.products.length > 0;
  const isEmptyServices = value.services && value.services.length > 0;

  if (!isEmptyProducts && !isEmptyServices) {
    return helpers.message(
      'We need a least one product or service to create an order'
    );
  }

  return value;
};

const createSchema = Joi.object({
  location: Joi.string().required(),
  destinyAddress: Joi.string().required(),
  products: Joi.array().items(
    Joi.object({
      subcategory: Joi.string().required(),
      name: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number()
    })
  ),
  services: Joi.array().items(
    Joi.object({
      description: Joi.string().required(),
      subcategory: Joi.string().required(),
      name: Joi.string().required(),
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
