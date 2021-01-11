const accountModel = require('../../db/models/account.model');
const accountRepository = require('./account.repository');

let accountData;

describe('#create', () => {
  describe('When create a account', () => {
    it('should save an account in the database', async () => {
      accountData = {
        email: 'skatintest@tes.com',
        identificationPhone: '',
        password: 'blibloblu',
        firstName: 'Skatin',
        lastName: 'BLiblo'
      };

      await accountRepository.create(accountData);

      expect(await accountModel.countDocuments()).toEqual(1);
    });
  });
});

describe('#update', () => {
  describe('When update a account', () => {
    it('should update the account on the database', async () => {
      accountData = {
        email: 'skatintest@tes.com',
        identificationPhone: '',
        password: 'blibloblu',
        firstName: 'Skatin',
        lastName: 'BLiblo'
      };

      const createdAccount = await accountRepository.create(accountData);

      expect(createdAccount.identificationPhone).toEqual('');

      const updateData = {
        identificationPhone: '3001114455'
      };

      await accountRepository.update(updateData);

      const foundAccount = await accountModel.findById(createdAccount._id);

      expect(foundAccount.email).toEqual(accountData.email);

      expect(foundAccount.identificationPhone).toEqual(
        updateData.identificationPhone
      );
    });
  });
});
