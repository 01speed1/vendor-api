const authMiddlesware = require('./auth.middlewares');
const getAccountMiddleware = require('./getAccountIds.middlewares');

module.exports = {
  ...authMiddlesware,
  ...getAccountMiddleware
};
