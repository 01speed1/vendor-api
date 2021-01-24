var jwt = require('jsonwebtoken');

const { AUTH_SECRET } = process.env;

const create = (payload = {}) => {
  const updatedPayload = {
    timestamp: new Date().getTime(),
    expireIn: 60 * 60 * 24,
    ...payload
  };

  const token = jwt.sign(updatedPayload, AUTH_SECRET);

  return token;
};

module.exports = { create };
