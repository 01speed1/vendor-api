const { JWTBuilder } = require('../../libs/auth/JWTBuilder');
const {
  createAccount,
} = require('../../src/entities/accounts/account.services');
const { createUser } = require('../../src/entities/users/user.services');
const { encrypt } = require('../../libs/auth/Encrypter');

const {
  creationParametersValidator: validateUserParams,
} = require('../../src/entities/users/user.validations');
const {
  credentialsParametersValidator: validateCredentials,
  creationParametersValidator: validateAccountParams,
} = require('../../src/entities/accounts/account.validations');

const encryptPassword = (payload = {}) => {
  delete payload['password_confirmation'];

  return {
    ...payload,
    password: encrypt(payload['password']),
  };
};

const payloadSorter = async (payload = {}) => {
  const userParameters = {
    name: payload['name'],
    lastName: payload['lastName'],
  };

  const accountParameters = {
    email: payload['email'],
    password: payload['password'],
  };

  const updatedPayload = {
    userParameters,
    accountParameters,
  };

  return updatedPayload;
};

const userRegistrationPersister = async (payload = {}) => {
  const validatedParams = await validateUserParams(payload);
  const createdUser = await createUser(validatedParams);
  return { ownerID: createdUser['_id'] };
};

const accountRegistrationPersister = async (payload = {}) => {
  const validatedParams = await validateAccountParams(payload);
  const createdAccount = await createAccount(validatedParams);

  const { _id: accountID, ownerID, email } = createdAccount;

  return { accountID, ownerID, email };
};<

const sessionTokenBuilder = (payload = {}) => JWTBuilder(payload);

function RegistrationTransaction(payload = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const validatedCredentials = await validateCredentials(payload);
      const withEncryptedPassword = await encryptPassword(validatedCredentials);

      const sortedPayload = await payloadSorter(withEncryptedPassword);

      const { ownerID } = await userRegistrationPersister(
        sortedPayload['userParameters']
      );

      const accountParameters = {
        ...sortedPayload['accountParameters'],
        ownerID,
      };

      const createdAccount = await accountRegistrationPersister(
        accountParameters
      );

      const sessionToken = await sessionTokenBuilder(createdAccount);

      resolve(sessionToken);
    } catch (errors) {
      reject(errors);
    }
  });
}

module.exports = { RegistrationTransaction };
