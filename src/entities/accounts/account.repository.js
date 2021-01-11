const accountModel = require('../../../src/db/models/account.model');
const objectUtils = require('../../utils/objects');

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
  const filteredParamaters = objectUtils.removeEmpties({
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

  return accountModel.updateOne(id, filteredParamaters);
};

module.exports = {
  create,
  update
};
