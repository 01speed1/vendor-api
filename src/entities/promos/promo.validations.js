const { celebrate, Joi, Segments } = require('celebrate');

const { isEmptyProductsOrService } = require('../../utils/validations');

const { TYPES, KEYS } = require('./promo.constants');

const { MULTI_BUY, DISCOUNT_RATE, DISCOUNT_PRICE, FREE_PRODUCT } = TYPES;

const typeSchemas = {
  [MULTI_BUY]: Joi.object({
    name: Joi.string().valid(MULTI_BUY),
    [MULTI_BUY]: {
      min: Joi.number().required(),
      get: Joi.number().required()
    }
  }),
  [DISCOUNT_RATE]: Joi.object({
    name: Joi.string().valid(DISCOUNT_RATE),
    [DISCOUNT_RATE]: Joi.number().max(100).required()
  }),
  [DISCOUNT_PRICE]: Joi.object({
    name: Joi.string().valid(DISCOUNT_PRICE),
    [DISCOUNT_PRICE]: Joi.number().min(1).required()
  }),
  [FREE_PRODUCT]: Joi.object({
    name: Joi.string().valid(FREE_PRODUCT),
    [FREE_PRODUCT]: Joi.object({
      subcategoryId: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number(),
      quantity: Joi.number()
    })
  })
};

const validateTypes = (value, helpers) => {
  if (!Object.values(TYPES).includes(value.name))
    return helpers.message(`type.name is not a valid name included in ${KEYS}`);

  const { error, value: valueValidated } = typeSchemas[value.name].validate(
    value
  );

  if (error) throw error;

  return valueValidated;
};

const createSchema = Joi.object({
  businessId: Joi.string().required(),
  products: Joi.array().items(
    Joi.object({
      subcategoryId: Joi.string().required(),
      name: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required()
    })
  ),
  services: Joi.array().items(
    Joi.object({
      description: Joi.string().required(),
      subcategoryId: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number().required()
    })
  ),
  hoursLeft: Joi.number().required(),
  type: Joi.object().custom(validateTypes)
}).custom(isEmptyProductsOrService);

const createValidation = celebrate({
  [Segments.BODY]: createSchema
});

module.exports = {
  createValidation
};
