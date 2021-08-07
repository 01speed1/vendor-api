const consumerMock = require('./consumer.mock');
const businessMock = require('./business.mock');
const carrierMock = require('./carrier.mock');
const rolesPermissionMock = require('./rolesPermission.mock');

const accountModel = require('../../../src/db/models/account.model');
const fakeGoose = require('../../../libs/fakeGoose');
const encrypter = require('../../../libs/auth/Encrypter');
const faker = require('faker');

const fakeModel = fakeGoose(accountModel);

const registerFake = params => {
  let fakePassword = params.password || faker.finance.bitcoinAddress();

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

  const createFakeModels = accountId => {
    return Promise.all([
      consumerMock.createFake({ accountId }),
      businessMock.createFake({ accountId }),
      carrierMock.createFake({ accountId })
    ]);
  };

  const createFakeRolePermissions = accountId =>
    rolesPermissionMock.createFakeNewAccount(accountId);

  return {
    saveFake,
    fakePassword,
    createFakeModels,
    createFakeRolePermissions
  };
};

module.exports = { ...fakeModel, registerFake };
