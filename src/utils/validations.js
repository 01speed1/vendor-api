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

module.exports = { isEmptyProductsOrService };
