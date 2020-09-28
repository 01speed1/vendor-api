const {
  ParametersValidator,
} = require('../../../libs/validation/ParametersValidator');

const basicCreadentialsRules = {
  email: 'string|email|required',
  password: 'string|confirmed|required',
  password_confirmation: 'string|required',
};

const creationRules = {
  email: 'string|email|required',
  identificationPhone: 'string',
  password: {
    IVEncryptKey: 'string|required',
    encryptedData: 'string|required',
  },
  pinPass: 'string',
  twoFactorsToken: 'string',
  facebookToken: 'string',
  googleToken: 'string',
  twitterToken: 'string',
  isAdmin: 'boolean',
  isCustomer: 'boolean',
  isVendor: 'boolean',
  ownerID: 'required',
};

function credentialsParametersValidator(parameters) {
  return ParametersValidator(parameters, basicCreadentialsRules);
}

function creationParametersValidator(parameters) {
  return ParametersValidator(parameters, creationRules);
}

module.exports = {
  creationParametersValidator,
  credentialsParametersValidator,
};
