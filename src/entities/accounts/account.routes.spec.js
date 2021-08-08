const {
  accountMock,
  consumerMock,
  businessMock,
  carrierMock
} = require('../../../test/mocks/models/');

const { accountHelper } = require('../../../test/helpers');

const { apiServerConnection } = require('../../../test/jest.helpers');
const request = apiServerConnection();

let createdAccountMock, token;

describe('Like a user, when I visit "/api/accounts/signup"', () => {
  it('should create account', async () => {
    const accountData = {
      email: 'goka@skate.com',
      identificationPhone: '3032241247',
      password: 'blibloblo',
      validatePassword: 'blibloblo',
      firstName: 'SKatin',
      lastName: 'BLiblo'
    };

    const response = await request
      .post('/api/accounts/signup')
      .send(accountData);

    expect(response.body).toEqual({
      message: 'account created'
    });

    expect(await accountMock.model.countDocuments()).toEqual(1);
  });

  it('should validate required email', async () => {
    const response = await request.post('/api/accounts/signup').send({});

    expect(response.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'celebrate request validation failed',
      validation: {
        body: {
          source: 'body',
          keys: ['email'],
          message: '"email" is required'
        }
      }
    });
  });

  it('should compare the passwords', async () => {
    const badPasswords = {
      email: 'bli@blo.com',
      identificationPhone: '456334526',
      password: 'bloblible',
      validatePassword: 'blableblo'
    };

    const response = await request
      .post('/api/accounts/signup')
      .send(badPasswords);

    expect(response.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'celebrate request validation failed',
      validation: {
        body: {
          source: 'body',
          keys: ['validatePassword'],
          message: '"validatePassword" must be [ref:password]'
        }
      }
    });
  });

  it('should create a consumer, business, and carrier reference', async () => {
    const accountData = {
      email: 'goka@skate.com',
      identificationPhone: '3032241247',
      password: 'blibloblo',
      validatePassword: 'blibloblo',
      firstName: 'SKatin',
      lastName: 'BLiblo'
    };

    await request.post('/api/accounts/signup').send(accountData);

    expect(await consumerMock.model.countDocuments()).toEqual(1);
    expect(await businessMock.model.countDocuments()).toEqual(1);
    expect(await carrierMock.model.countDocuments()).toEqual(1);
  });
});

describe('Like a current user, when I visit "/api/accounts/login"', () => {
  beforeEach(async () => {
    const {
      token: tokenLogged,
      account
    } = await accountHelper.generateFakeLoginData({ email: 'before@each.com' });

    token = tokenLogged;
    createdAccountMock = account;
  });

  it('should validate my credentials', async () => {
    await accountMock.createFake({ email: 'goka@skate.com' });

    const accountData = {
      email: 'goka@skate.com',
      password: ''
    };

    const response = await request
      .post('/api/accounts/login')
      .send(accountData)
      .expect(400);

    expect(response.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'celebrate request validation failed',
      validation: {
        body: {
          source: 'body',
          keys: ['password'],
          message: '"password" is not allowed to be empty'
        }
      }
    });
  });

  it('should return an authentication token', async () => {
    const { saveFake, fakePassword } = accountMock.registerFake({
      email: 'goka@skate.com'
    });

    const { _id: accountId } = await saveFake();
    await consumerMock.createFake({ accountId });
    await businessMock.createFake({ accountId });
    await carrierMock.createFake({ accountId });

    const accountData = {
      email: 'goka@skate.com',
      password: fakePassword
    };

    const response = await request
      .post('/api/accounts/login')
      .send(accountData)
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });

  describe('When account does not exist', () => {
    it("Should return expected error 'Incorrect email or password'", async () => {
      const accountData = {
        email: 'goka@skate.com',
        password: 'bliblablo'
      };

      const response = await request
        .post('/api/accounts/login')
        .send(accountData)
        .expect(401);

      expect(response.body).toEqual({ message: 'Incorrect email or password' });
    });
  });

  describe('When password is incorrect', () => {
    it('should return 401 unauthorized', async () => {
      const { saveFake } = accountMock.registerFake({
        email: 'goka@skate.com'
      });

      await saveFake();

      const accountData = {
        email: 'goka@skate.com',
        password: 'bliblablo'
      };

      const response = await request
        .post('/api/accounts/login')
        .send(accountData)
        .expect(401);

      expect(response.body).toEqual({ message: 'Incorrect email or password' });
    });
  });
});

describe('Like a logged account, when I visit "/api/accounts/permissions"', () => {
  it('should return the permissions', async () => {
    const accountData = {
      firstName: 'Elsa',
      lastName: 'Bañonsito'
    };

    const {
      token: tokenLogged,
      account
    } = await accountHelper.generateFakeLoginData(accountData);

    token = tokenLogged;
    createdAccountMock = account;

    const expectedResponse = {
      firstName: accountData.firstName,
      lastName: accountData.lastName,
      roles: ['CONSUMER', 'CARRIER', 'BUSINESS'],
      permissions: [
        'CONSUMERREAD',
        'CONSUMERWRITE',
        'CONSUMERUPDATE',
        'CONSUMERDELETE',
        'CARRIERREAD',
        'CARRIERWRITE',
        'CARRIERUPDATE',
        'CARRIERDELETE',
        'BUSINESSREAD',
        'BUSINESSWRITE',
        'BUSINESSUPDATE',
        'BUSINESSDELETE'
      ]
    };

    const response = await request
      .get('/api/accounts/permissions')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual(expectedResponse);
  });

  describe('when the user does not send the auth  toke', () => {
    it('should return the guest permissions', async () => {
      const expectedResponse = {
        roles: ['GUEST'],
        permissions: []
      };

      const response = await request
        .get('/api/accounts/permissions')
        .expect(200);

      expect(response.body).toEqual(expectedResponse);
    });
  });
});
