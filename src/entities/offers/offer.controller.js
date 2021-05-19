const offerRepository = require('./offer.repository');
const offerServices = require('./offer.services');

const getAll = async (request, response) => {
  try {
    const offers = await offerRepository.getAll().lean();
    
    response.json({ offers});
    
  } catch (error) {
    response.status(500).json({ error: error.message });
    
  }

}

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

    response.json({ message: 'Offer created' });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

module.exports = { 
  getAll,
  create 
};
