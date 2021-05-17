const promoRepository = require('./promo.repository');
const promoServices = require('./promo.services');

const get = async (request, response) => {
  try {
    const promos = await promoRepository.get();

    response.json({ promos });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const create = async (request, response) => {
  try {
    const { body, account } = request;
    const { products, services } = body;

    if (products) {
      const createdProducts = await promoServices.createProducts(products);
      body.products = createdProducts.map(product => product._id.toString());
    }

    if (services) {
      const createdServices = await promoServices.createServices(services);
      body.services = createdServices.map(service => service._id);
    }

    let bodyUpdated = await promoServices.updateFreeProductBody(body);

    const promoData = { ...bodyUpdated, consumerId: account.consumerId };

    await promoRepository.create(promoData);

    response.json({ message: 'Promo created' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { create, get };
