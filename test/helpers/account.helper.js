const { accountMock } = require('../mocks/models/');

const { apiServerConnection } = require('../jest.helpers');
const request = apiServerConnection();

const generateFakeLoginData = async (params = {}) => {
  const {
    email = 'test@test.com',
    password = '123456789',
    lastName = 'elsa',
    firstName = 'Skatin'
  } = params;

  const {
    saveFake,
    fakePassword,
    createFakeModels,
    createFakeRolePermissions
  } = accountMock.registerFake({
    email,
    password,
    lastName,
    firstName
  });

  const createdAccount = await saveFake();
  const { _id: accountId, email: accountEmail } = createdAccount;

  const rolesPermission = await createFakeRolePermissions(accountId);

  const [consumer, business, carrier] = await createFakeModels(accountId);

  const { body } = await request
    .post('/api/accounts/login')
    .send({ email: accountEmail, password: fakePassword });

  return {
    token: body.token,
    consumer,
    business,
    carrier,
    account: createdAccount,
    rolesPermission
  };
};

module.exports = { generateFakeLoginData };
