var jwt = require('jsonwebtoken');
var { DateTime } = require('luxon');

const { AUTH_SECRET } = process.env;

const create = (payload = {}) => {
  const currentDate = DateTime.now();
  const expirationDate = currentDate.plus(60 * 60 * 24);

  const updatedPayload = {
    timestamp: currentDate.toMillis(),
    expireIn: expirationDate.toMillis(),
    ...payload
  };

  const token = jwt.sign(updatedPayload, AUTH_SECRET);

  return { token, expirationAt: expirationDate.toJSDate() };
};

module.exports = { create };
