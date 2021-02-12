const offerRepository = require('./offer.repository');

const create = async (request, response) => {
  try {
    const { body } = request;

    await offerRepository.create(body);

    response.json({ message: 'offer created' });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

module.exports = { create };
