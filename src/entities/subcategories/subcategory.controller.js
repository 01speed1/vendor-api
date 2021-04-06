const subcategoryRepository = require('./subcategory.repository');

const getByCategoryId = async (request, response) => {
  try {
    const { params } = request;

    const subcategories = await subcategoryRepository.getByCategoryId(
      params.categoryId
    );

    response.json({ subcategories });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const create = async (request, response) => {
  try {
    const { body } = request;

    await subcategoryRepository.create(body);

    response.json({ message: 'Subcategory created' });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = { getByCategoryId, create };
