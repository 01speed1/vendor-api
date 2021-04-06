const {
  categoryMock,
  accountMock,
  consumerMock
} = require('../../../test/mocks/models/');

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
