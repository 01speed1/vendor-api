var jwt = require('jsonwebtoken');
var { DateTime } = require('luxon');

const { AUTH_SECRET } = process.env;

const create = (payload = {}) => {
  const currentDate = DateTime.now();

  const expirationExtension = 60 * 60 * 24;

  const expirationDate = currentDate.plus(expirationExtension);

  const updatedPayload = {
    timestamp: currentDate.toMillis(),
    expireIn: expirationDate.toMillis(),
    ...payload
  };

  const token = jwt.sign(updatedPayload, AUTH_SECRET);

  return {
    token,
    expirationDate: expirationDate.toJSDate(),
    expiredAt: expirationExtension
  };
};

module.exports = { create };
