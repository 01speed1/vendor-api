const accountModel = require('../../db/models/account.model');
const { apiServerConnection } = require('../../../test/jest.helpers');
const request = apiServerConnection();

describe('Like a user, when I visit "/api/accounts/signup"', () => {
  it('should created account', async () => {
    // visit the path

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

    // verify the account created
    expect(response.body).toEqual({
      message: 'account created'
    });

    expect(await accountModel.countDocuments()).toEqual(1);
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
});
