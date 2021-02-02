const jwt = require('express-jwt');

const { AUTH_SECRET } = process.env;

const validateJWT = jwt({
  secret: AUTH_SECRET,
  algorithms: ['sha1', 'RS256', 'HS256']
});

module.exports = { validateJWT };
