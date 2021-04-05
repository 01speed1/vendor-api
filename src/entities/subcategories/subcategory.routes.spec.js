const {
  categoryMock,
  subcategoryMock,
  accountMock,
  consumerMock
} = require('../../../test/mocks/models');

const { apiServerConnection } = require('../../../test/jest.helpers');
const request = apiServerConnection();

let createdAccount, token;

beforeEach(async () => {
  createdAccount = await accountMock.model.create({
    email: 'skatin@mail.com',
    password: 'bloblu',
    lastName: 'MyPresident',
    firstName: 'Skatin'
  });

  await consumerMock.model.create({
    accountId: createdAccount._id
  });

  const { saveFake, createFakeModels, fakePassword } = accountMock.registerFake(
    {
      email: 'fake@man.com'
    }
  );

  const { _id: accountId, email } = await saveFake();
  await createFakeModels(accountId);

  const { body } = await request
    .post('/api/accounts/login')
    .send({ email, password: fakePassword });

  token = body.token;
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
