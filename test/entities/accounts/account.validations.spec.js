const {
  creationParametersValidator,
  credentialsParametersValidator,
} = require('../../../src/entities/accounts/account.validations');

const userMocker = require('../../mocks/entities/user.mock');

describe('creationParametersValidator', () => {
  describe('when receive the correct params', () => {
    const requiredParameters = {
      email: 'PonnyTheSoulKiller@vendor.com',
      identificationPhone: '3004005060',
      password: {
        IVEncryptKey: 'ponnylover',
        encryptedData: '2tg23g2363f26gv346733v236v23cv',
      },
      pinPass: '0000',
      twoFactorsToken: 'twoFactorsToken',
      facebookToken: 'facebookToken',
      googleToken: 'googleToken',
      twitterToken: 'twitterToken',
      isAdmin: true,
      isCustomer: false,
      isVendor: false,
    };

    it('should return the params', async () => {
      const ownerID = (await userMocker())['_id'].toString();

      const updatedRequiredParams = { ...requiredParameters, ownerID };

      const response = await creationParametersValidator(updatedRequiredParams);

      expect(response).toEqual(updatedRequiredParams);
    });
  });

  describe('with the incorrect params', () => {
    it('should return the errors', () => {
      const response = creationParametersValidator({ contactPhones: '435345' });

      const expectedErrors = {
        email: ['The email field is required.'],
        'password.IVEncryptKey': [
          'The password.IVEncryptKey field is required.',
        ],
        'password.encryptedData': [
          'The password.encryptedData field is required.',
        ],
        ownerID: ['The ownerID field is required.'],
      };

      response.catch((errors) => {
        expect(errors).toEqual(expectedErrors);
      });
    });
  });
});

describe('credentialsParametersValidator', () => {
  describe('when receive the crendentials', () => {
    it('should return the validated credentials', async () => {
      const response = await credentialsParametersValidator({
        email: 'a@b.com',
        password: 'gg2g23g',
        password_confirmation: 'gg2g23g',
      });

      expect(response).toEqual({
        email: 'a@b.com',
        password: 'gg2g23g',
        password_confirmation: 'gg2g23g',
      });
    });
  });
});
