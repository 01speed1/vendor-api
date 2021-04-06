const categoryRepository = require('./category.repository');

const getAll = async (request, response) => {
  try {
    const categories = await categoryRepository.getAll();

    response.json({ categories });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const create = async (request, response) => {
  try {
    const { body } = request;

    await categoryRepository.create(body);

    response.json({ message: 'Category created' });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, create };
