const offerRepository = require('./offer.repository');
const offerServices = require('./offer.services');

const create = async (request, response) => {
  try {
    const { body } = request;

    const { _id: offerId } = await offerRepository.create(body);

    const { productsOffered, servicesOffered } = body;

    await offerServices.createProductsAndServicesOffered({
      offerId,
      productsList: productsOffered,
      servicesList: servicesOffered
    });

    response.json({ message: 'offer created' });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

module.exports = { create };
