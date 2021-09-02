const authMiddleware = require('./auth.middlewares');
const getAccountMiddleware = require('./getAccountIds.middlewares');
const loggerMiddleware = require('./logger.middlewares');
const validationsMiddleware = require('./validations.middlewares');

module.exports = {
  ...authMiddleware,
  ...getAccountMiddleware,
  ...loggerMiddleware,
  ...validationsMiddleware
};
