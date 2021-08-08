const jwt = require('express-jwt');

const { AUTH_SECRET } = process.env;

const validateGuestPermissions = (request, response, next) => {
  if (request.headers.authorization) {
    return next();
  }

  return response.json({
    roles: ['GUEST'],
    permissions: []
  });
};

const validateJWT = jwt({
  secret: AUTH_SECRET,
  algorithms: ['sha1', 'RS256', 'HS256']
});

module.exports = { validateJWT, validateGuestPermissions };
