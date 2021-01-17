const accountMock = require('../../../test/mocks/models/account.mock');
const consumerMock = require('../../../test/mocks/models/consumer.mock');

// const businessModel = require('../../db/models/business.model');
// const carrierModel = require('../../db/models/carrier.model');

const { apiServerConnection } = require('../../../test/jest.helpers');
const request = apiServerConnection();

describe('Like a user, when I visit "/api/accounts/signup"', () => {
  it('should created account', async () => {
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
      error: '"email" is required'
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
      error: '"validatePassword" must be [ref:password]'
    });
  });

  xit('should create a consumer, business, and carrier reference', async () => {
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
    expect(await businessModel.countDocuments()).toEqual(1);
    expect(await carrierModel.countDocuments()).toEqual(1);
  });
});

describe('Like a current user, when I visit "/api/accounts/login"', () => {
  it('should validate my credentials', async () => {
    await accountMock.createFake({ email: 'goka@skate.com' });

    const accountData = {
      email: 'goka@skate.com',
      password: ''
    };

    const response = await request
      .post('/api/accounts/login')
      .send(accountData)
      .expect(401);

    expect(response.body).toEqual({
      error: '"password" is required'
    });
  });

  it('should return an authentication token', async () => {
    await accountMock.createFake({
      email: 'goka@skate.com',
      password: 'superIziPss'
    });

    const accountData = {
      email: 'goka@skate.com',
      password: 'superIziPss'
    };

    const response = await request
      .post('/api/accounts/login')
      .send(accountData)
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });
});
