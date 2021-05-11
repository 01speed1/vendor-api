const authMiddlesware = require('./auth.middlewares');
const getAccountMiddleware = require('./getAccountIds.middlewares');
const loggerMiddleware = require('./logger.middlewares');

module.exports = {
  ...authMiddlesware,
  ...getAccountMiddleware,
  ...loggerMiddleware
};
