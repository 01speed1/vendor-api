const subcategoryRepository = require('./subcategory.repository');

const create = async (request, response) => {
  try {
    const { body } = request;

    await subcategoryRepository.create(body);

    response.json({ message: 'Subcategory created' });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = { create };
