const jwt = require('express-jwt');

const { AUTH_SECRET } = process.env;

const validateGuestPermissions = (request, response, next) => {
  if (request.headers.authorization) {
    return next();
  }

  return response.status(251).json({
    roles: ['GUEST'],
    permissions: []
  });
};

const validateJWT = jwt({
  secret: AUTH_SECRET,
  algorithms: ['sha1', 'RS256', 'HS256'],
  credentialsRequired: false
});

module.exports = { validateJWT, validateGuestPermissions };
