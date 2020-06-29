const jwt = require("jsonwebtoken");

const { getUser } = require("../entities/users/users.services");

module.exports.userSession = async ({ email, password }) => {
  const foundUser = await getUser({ email, password });

  return foundUser;
};
