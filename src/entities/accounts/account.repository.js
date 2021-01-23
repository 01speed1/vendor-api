const accountModel = require('../../../src/db/models/account.model');
const objectUtils = require('../../utils/objects');
const encrypter = require('../../../libs/auth/Encrypter');

const create = ({
  email,
  identificationPhone,
  password,
  firstName,
  lastName
}) => {
  return accountModel.create({
    email,
    identificationPhone,
    password,
    firstName,
    lastName
  });
};

const update = ({
  id,
  email,
  identificationPhone,
  password,
  firstName,
  lastName,
  twoFactorsToken,
  facebookToken,
  googleToken,
  twitterToken,
  modifiedAt
}) => {
  const filteredParameters = objectUtils.removeEmpties({
    email,
    identificationPhone,
    password,
    firstName,
    lastName,
    twoFactorsToken,
    facebookToken,
    googleToken,
    twitterToken,
    modifiedAt
  });

  return accountModel
    .findByIdAndUpdate(id, filteredParameters, {
      rawResult: true,
      new: true
    })
    .lean();
};

const register = ({
  email,
  identificationPhone,
  password,
  firstName,
  lastName
}) => {
  return accountModel.create({
    email,
    identificationPhone,
    password: encrypter.encrypt(password),
    firstName,
    lastName
  });
};

const foundByEmail = email => accountModel.findOne({ email });

module.exports = {
  create,
  update,
  register,
  foundByEmail
};
