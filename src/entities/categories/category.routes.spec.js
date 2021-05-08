const { categoryMock } = require('../../../test/mocks/models/');

const { accountHelper } = require('../../../test/helpers');

const { apiServerConnection } = require('../../../test/jest.helpers');
const request = apiServerConnection();

let token;

beforeEach(async () => {
  const { token: loggedToken } = await accountHelper.generateFakeLoginData();
  token = loggedToken;
});

describe('Like a user, when I visit GET "/api/categories"', () => {
  it('should should create a category', async () => {
    await categoryMock.createFake();
    await categoryMock.createFake();
    await categoryMock.createFake();

    const response = await request
      .get('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(JSON.parse(response.text).categories).toHaveLength(3);
  });
});

describe('Like a user, when I visit POST "/api/categories"', () => {
  it('should should create a category', async () => {
    const body = { name: 'A Super duper category' };

    await request
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(200);

    expect(await categoryMock.model.countDocuments()).toEqual(1);
  });
});
