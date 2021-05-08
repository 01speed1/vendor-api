const { categoryMock, subcategoryMock } = require('../../../test/mocks/models');

const { accountHelper } = require('../../../test/helpers');

const { apiServerConnection } = require('../../../test/jest.helpers');
const request = apiServerConnection();

let token;

beforeEach(async () => {
  const { token: tokenLogged } = await accountHelper.generateFakeLoginData();

  token = tokenLogged;
});

describe('Like a user, when I visit GET "/api/subcategories/category/:categoryId"', () => {
  it('should return the subcategories of a category', async () => {
    const { _id: categoryId } = await categoryMock.createFake();

    subcategoryMock.createFake({ categoryId });
    subcategoryMock.createFake({ categoryId });
    subcategoryMock.createFake({ categoryId });
    subcategoryMock.createFake();

    const response = await request
      .get(`/api/subcategories/category/${categoryId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(JSON.parse(response.text).subcategories).toHaveLength(3);
  });
});

describe('Like a user, when I visit POST "/api/subcategories"', () => {
  it('should should create a subcategory', async () => {
    const { _id: categoryId } = await categoryMock.createFake();

    const body = { name: 'A Super duper subcategory', categoryId };

    await request
      .post('/api/subcategories')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(200);

    expect(await subcategoryMock.model.countDocuments()).toEqual(1);
  });

  describe('When params are incomplete', () => {
    it('should return an error', async () => {
      const body = {};

      const response = await request
        .post('/api/subcategories')
        .set('Authorization', `Bearer ${token}`)
        .send(body)
        .expect(400);

      const expectedResponse = JSON.stringify({
        statusCode: 400,
        error: 'Bad Request',
        message: 'celebrate request validation failed',
        validation: {
          body: {
            source: 'body',
            keys: ['name'],
            message: '"name" is required'
          }
        }
      });

      expect(response.text).toEqual(expectedResponse);
    });
  });
});
