const { accountMock, consumerMock } = require('../mocks/models/');

const { apiServerConnection } = require('../jest.helpers');
const request = apiServerConnection();

const generateFakeLoginData = async () => {
  let createdAccount = await accountMock.model.create({
    email: 'skatin@mail.com',
    password: 'bloblu',
    lastName: 'MyPresident',
    firstName: 'Skatin'
  });

  await consumerMock.model.create({
    accountId: createdAccount._id
  });

  const { saveFake, fakePassword, createFakeModels } = accountMock.registerFake(
    {
      email: 'fake@man.com'
    }
  );

  const { _id: accountId, email } = await saveFake();

  const [consumer, business, carrier] = await createFakeModels(accountId);

  const { body } = await request
    .post('/api/accounts/login')
    .send({ email, password: fakePassword });

  return { token: body.token, consumer, business, carrier };
};

module.exports = { generateFakeLoginData };
