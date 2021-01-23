const accountModel = require('../../../src/db/models/account.model');
const fakeGoose = require('../../../libs/fakeGoose');
const encrypter = require('../../../libs/auth/Encrypter');
const faker = require('faker');

const fakeModel = fakeGoose(accountModel);

const registerFake = params => {
  const fakePassword = faker.finance.bitcoinAddress();

  const fakeData = fakeModel.generateFakeData();

  const finalParams = {
    email: fakeData.email,
    identificationPhone: fakeData.identificationPhone,
    password: fakePassword,
    firstName: fakeData.firstName,
    lastName: fakeData.lastName,
    ...params
  };

  const saveFake = () =>
    accountModel.create({
      ...finalParams,
      password: encrypter.encrypt(finalParams.password)
    });

  return { saveFake, fakePassword };
};

module.exports = { ...fakeModel, registerFake };
